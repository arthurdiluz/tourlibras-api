import { Module } from '@nestjs/common';
import { StudentLessonController } from './controllers/student-lesson.controller';
import { StudentLessonService } from './services/student-lesson.service';
import { StudentLessonRepository } from './repositories/student-lesson.repository';
import { StudentModule } from '../student/student.module';
import { ProfessorLessonModule } from '../professor-lesson/professor-lesson.module';
import { LessonLevelModule } from '../lesson-level/lesson-level.module';

@Module({
  imports: [StudentModule, ProfessorLessonModule, LessonLevelModule],
  controllers: [StudentLessonController],
  providers: [StudentLessonService, StudentLessonRepository],
  exports: [StudentLessonService],
})
export class StudentLessonModule {}
