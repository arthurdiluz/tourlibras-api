import { Injectable } from '@nestjs/common';
import { DoneExerciseRepository } from '../repositories/done-exercise.repository';
import { CreateDoneExerciseDto } from '../dtos/create-done-exercise.dto';
import { FindDoneExerciseDto } from '../dtos/find-done-exercise.dto';
import { UpdateDoneExerciseDto } from '../dtos/update-done-exercise.dto';

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

  async update(doneExerciseId: string, body: UpdateDoneExerciseDto) {
    return this.doneExerciseRepository.update({
      where: { id: doneExerciseId },
      data: { ...body },
    });
  }

  async delete(doneExerciseId: string) {
    return this.doneExerciseRepository.delete({
      where: { id: doneExerciseId },
    });
  }
}
