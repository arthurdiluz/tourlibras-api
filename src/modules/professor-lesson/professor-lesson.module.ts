import { Module } from '@nestjs/common';
import { ProfessorLessonService } from './services/professor-lesson.service';
import { ProfessorLessonController } from './controllers/professor-lesson.controller';
import { ProfessorLessonRepository } from './repositories/professor-lesson.repository';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [ProfessorModule],
  controllers: [ProfessorLessonController],
  providers: [ProfessorLessonService, ProfessorLessonRepository],
  exports: [ProfessorLessonService],
})
export class ProfessorLessonModule {}
