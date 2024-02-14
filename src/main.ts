import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import helmet from 'helmet';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = configService?.getAppPort || undefined;

  // const corsOptions: CorsOptions = {
  //   origin: [],
  //   methods: ['POST', 'GET', 'DELETE', 'DELETE'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // };
  // app.enableCors(corsOptions);

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
