import { Module } from '@nestjs/common';
import { DoneExerciseService } from './services/done-exercise.service';
import { DoneExerciseController } from './controllers/done-exercise.controller';
import { DoneExerciseRepository } from './repositories/done-exercise.repository';

@Module({
  imports: [],
  controllers: [DoneExerciseController],
  providers: [DoneExerciseService, DoneExerciseRepository],
  exports: [DoneExerciseService, DoneExerciseRepository],
})
export class DoneExerciseModule {}
