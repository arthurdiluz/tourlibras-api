import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = configService?.getAppPort || undefined;

  const corsOptions: CorsOptions = {
    origin: ['*'],
    methods: ['*'],
    allowedHeaders: ['*'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);

  console.warn(`Application is running on ${await app.getUrl()}`);
}

bootstrap();
