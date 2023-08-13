import { Module } from '@nestjs/common';
import { StudentLessonController } from './controllers/student-lesson.controller';
import { StudentLessonService } from './services/student-lesson.service';
import { StudentLessonRepository } from './repositories/student-lesson.repository';
import { StudentModule } from '../student/student.module';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [StudentModule, ProfessorModule],
  controllers: [StudentLessonController],
  providers: [StudentLessonService, StudentLessonRepository],
  exports: [StudentLessonService],
})
export class StudentLessonModule {}
