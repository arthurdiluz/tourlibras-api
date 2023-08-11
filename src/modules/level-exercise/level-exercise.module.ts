import { Module } from '@nestjs/common';
import { LevelExerciseController } from './controllers/level-exercise.controller';
import { LevelExerciseService } from './services/level-exercise.service';
import { LevelExerciseRepository } from './repositories/level-exercise.repository';
import { LessonLevelModule } from '../lesson-level/lesson-level.module';
import { ExerciseAlternativeController } from './controllers/exercise-alternative.controller';
import { ExerciseAlternativeService } from './services/exercise-alternative.service';
import { ExerciseAlternativeRepository } from './repositories/exercise-alternative.repository';

@Module({
  imports: [LessonLevelModule],
  controllers: [LevelExerciseController, ExerciseAlternativeController],
  providers: [
    LevelExerciseService,
    ExerciseAlternativeService,
    LevelExerciseRepository,
    ExerciseAlternativeRepository,
  ],
  exports: [LevelExerciseService, ExerciseAlternativeService],
})
export class LevelExerciseModule {}
