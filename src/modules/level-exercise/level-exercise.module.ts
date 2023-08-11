import { Module } from '@nestjs/common';
import { LevelExerciseController } from './controllers/level-exercise.controller';
import { LevelExerciseService } from './services/level-exercise.service';
import { LevelExerciseRepository } from './repositories/level-exercise.repository';
import { LessonLevelModule } from '../lesson-level/lesson-level.module';

@Module({
  imports: [LessonLevelModule],
  controllers: [LevelExerciseController],
  providers: [LevelExerciseService, LevelExerciseRepository],
  exports: [LevelExerciseService],
})
export class LevelExerciseModule {}
