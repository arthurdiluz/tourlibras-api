import { Module } from '@nestjs/common';
import { LessonLevelService } from './services/lesson-level.service';
import { LessonLevelController } from './controllers/lesson-level.controller';
import { LessonLevelRepository } from './repositories/lesson-level.repository';
import { ProfessorLessonModule } from '../professor-lesson/professor-lesson.module';

@Module({
  imports: [ProfessorLessonModule],
  controllers: [LessonLevelController],
  providers: [LessonLevelService, LessonLevelRepository],
  exports: [LessonLevelService],
})
export class LessonLevelModule {}
