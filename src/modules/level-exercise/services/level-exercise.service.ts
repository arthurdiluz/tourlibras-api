import { Injectable } from '@nestjs/common';
import { LevelExerciseRepository } from '../repositories/level-exercise.repository';

@Injectable()
export class LevelExerciseService {
  constructor(private readonly exerciseRepository: LevelExerciseRepository) {}
}
