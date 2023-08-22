import { Module } from '@nestjs/common';
import { LessonLevelDoneService } from './services/lesson-level-done.service';
import { LessonLevelDoneController } from './controllers/lesson-level-done.controller';
import { LessonLevelDoneRepository } from './repositories/lesson-level-done.repository';

@Module({
  imports: [],
  controllers: [LessonLevelDoneController],
  providers: [LessonLevelDoneService, LessonLevelDoneRepository],
  exports: [LessonLevelDoneService],
})
export class LessonLevelDoneModule {}
