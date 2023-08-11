import { Injectable } from '@nestjs/common';
import { ExerciseAlternativeRepository } from '../repositories/exercise-alternative.repository';
import { FindExerciseAlternativeDto } from '../dtos/alternative/find-exercise-alternative.dto';

@Injectable()
export class ExerciseAlternativeService {
  constructor(
    private readonly alternativeRepository: ExerciseAlternativeRepository,
  ) {}

  async find(
    exerciseId: number,
    { text, ...query }: FindExerciseAlternativeDto,
  ) {
    return this.alternativeRepository.findMany({
      where: {
        Exercise: { id: exerciseId },
        text: { contains: text, mode: 'insensitive' },
        ...query,
      },
    });
  }
}
