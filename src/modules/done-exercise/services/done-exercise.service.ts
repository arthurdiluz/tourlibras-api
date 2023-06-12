import { Injectable } from '@nestjs/common';
import { DoneExerciseRepository } from '../repositories/done-exercise.repository';

@Injectable()
export class DoneExerciseService {
  constructor(
    private readonly doneExerciseRepository: DoneExerciseRepository,
  ) {}
}
