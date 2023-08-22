import { Module } from '@nestjs/common';
import { LessonLevelDoneController } from './controllers/lesson-level-done.controller';
import { LessonLevelDoneService } from './services/lesson-level-done.service';
import { LessonLevelDoneRepository } from './repositories/lesson-level-done.repository';
import { StudentLessonModule } from '../student-lesson/student-lesson.module';
import { LevelExerciseModule } from '../level-exercise/level-exercise.module';

@Module({
  imports: [StudentLessonModule, LevelExerciseModule],
  controllers: [LessonLevelDoneController],
  providers: [LessonLevelDoneService, LessonLevelDoneRepository],
  exports: [LessonLevelDoneService],
})
export class LessonLevelDoneModule {}
