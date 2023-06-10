import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProfessorModule } from './modules/professor/professor.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessTokenGuard } from './common/decorators/guards/jwt';
import { StudentModule } from './modules/student/student.module';
import { ItemModule } from './modules/item/item.module';
import { MedalModule } from './modules/medal/medal.module';
import { LessonModule } from './modules/lesson/lesson.module';

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
    StudentModule,
    ProfessorModule,
    ItemModule,
    MedalModule,
    LessonModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
  ],
})
export class AppModule {}
