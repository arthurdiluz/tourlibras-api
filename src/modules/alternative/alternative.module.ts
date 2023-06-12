import { Module } from '@nestjs/common';
import { AlternativeService } from './services/alternative.service';
import { AlternativeController } from './controllers/alternative.controller';
import { AlternativeRepository } from './repositories/alternative.repository';
import { ExerciseModule } from '../exercise/exercise.module';

@Module({
  imports: [ExerciseModule],
  controllers: [AlternativeController],
  providers: [AlternativeService, AlternativeRepository],
  exports: [AlternativeService, AlternativeRepository],
})
export class AlternativeModule {}
