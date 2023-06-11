import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { CreateExerciseDto } from '../dtos/create-exercise.dto';
import { FindExerciseDto } from '../dtos/find-exercise.dto';
import { UpdateExerciseDto } from '../dtos/update-exercise.dto';

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

  async findById(exerciseId: string) {
    return this.exerciseRepository.findUnique({ where: { id: exerciseId } });
  }

  async update(exerciseId: string, body: UpdateExerciseDto) {
    return this.exerciseRepository.update({
      where: { id: exerciseId },
      data: { ...body },
    });
  }
}
