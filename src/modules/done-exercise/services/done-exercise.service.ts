import { Injectable } from '@nestjs/common';
import { DoneExerciseRepository } from '../repositories/done-exercise.repository';
import { CreateDoneExerciseDto } from '../dtos/create-done-exercise.dto';
import { FindDoneExerciseDto } from '../dtos/find-done-exercise.dto';

@Injectable()
export class DoneExerciseService {
  constructor(
    private readonly doneExerciseRepository: DoneExerciseRepository,
  ) {}

  async create(body: CreateDoneExerciseDto) {
    return this.doneExerciseRepository.create({
      data: { ...body },
    });
  }

  async find(query: FindDoneExerciseDto) {
    return this.doneExerciseRepository.findMany({
      where: { ...query },
    });
  }

  async findById(doneExerciseId: string) {
    return this.doneExerciseRepository.findUnique({
      where: { id: doneExerciseId },
    });
  }
}