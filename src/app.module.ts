import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from './config/config.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: Number(configService.ttl),
      limit: Number(configService.requestsLimit),
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
