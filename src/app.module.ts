import { Module } from '@nestjs/common';
import { JwtAccessTokenGuard } from './common/decorators/guards/jwt/jwt-access-token.guard';
import { ConfigService } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { APP_GUARD } from '@nestjs/core';
import { ProfessorMedalModule } from './modules/professor-medal/professor-medal.module';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: Number(configService.getTimeToLive),
      limit: Number(configService.getRequestsLimit),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    StudentModule,
    ProfessorModule,
    ProfessorMedalModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
  ],
})
export class AppModule {}
