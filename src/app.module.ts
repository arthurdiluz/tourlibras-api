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
import { ProfessorLessonModule } from './modules/professor-lesson/professor-lesson.module';
import { LessonLevelModule } from './modules/lesson-level/lesson-level.module';
import { LevelExerciseModule } from './modules/level-exercise/level-exercise.module';
import { StudentLessonModule } from './modules/student-lesson/student-lesson.module';
import { LessonLevelDoneModule } from './modules/lesson-level-done/lesson-level-done.module';
import { StudentItemModule } from './modules/student-item/student-item.module';

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
    ProfessorLessonModule,
    LessonLevelModule,
    LevelExerciseModule,
    StudentLessonModule,
    StudentItemModule,
    LessonLevelDoneModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessTokenGuard,
    },
  ],
})
export class AppModule {}
