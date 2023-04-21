import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './database/prisma.module';
import { ConfigService } from './config/config.service';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: Number(configService.ttl),
      limit: Number(configService.requestsLimit),
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
