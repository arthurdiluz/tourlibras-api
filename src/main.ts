import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = configService.getAppPort || undefined;

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // setup swagger (only in production)
  const config = new DocumentBuilder()
    .setTitle('TourLibras API')
    .setDescription('TourLibras API implementation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'TourLibras API',
    swaggerOptions: {
      docExpansion: 'none',
      operationsSorter: 'alpha',
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  };

  SwaggerModule.setup('api/v1/doc', app, document, customOptions);
  await app.listen(port);

  console.log(`Application is running on ${await app.getUrl()}`);
  console.log(`API docs on ${await app.getUrl()}/api/v1/doc`);
}

bootstrap();
