import { Module } from '@nestjs/common';
import { ExerciseService } from './services/exercise.service';
import { ExerciseController } from './controllers/exercise.controller';
import { ExerciseRepository } from './repositories/exercise.repository';

@Module({
  imports: [],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseRepository],
  exports: [ExerciseService, ExerciseRepository],
})
export class ExerciseModule {}
