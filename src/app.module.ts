import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: Number(configService.getTtl),
      limit: Number(configService.getRequestsLimit),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
