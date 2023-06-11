import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { CreateExerciseDto } from '../dtos/create-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async create(body: CreateExerciseDto) {
    return this.exerciseRepository.create({ data: { ...body } });
  }
}
