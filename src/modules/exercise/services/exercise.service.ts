import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}
}
