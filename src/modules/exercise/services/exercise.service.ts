import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { CreateExerciseDto } from '../dtos/create-exercise.dto';
import { FindExerciseDto } from '../dtos/find-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async create(body: CreateExerciseDto) {
    return this.exerciseRepository.create({ data: { ...body } });
  }

  async find({ statement, ...query }: FindExerciseDto) {
    return this.exerciseRepository.findMany({
      where: {
        statement: { contains: statement, mode: 'insensitive' },
        ...query,
      },
    });
  }
}
