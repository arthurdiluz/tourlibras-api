import { Injectable } from '@nestjs/common';
import { LevelRepository } from '../repositories/level.repository';
import { CreateLevelDto } from '../dtos/create-level.dto';
import { FindLevelDto } from '../dtos/find-level.dto';
import { UpdateLevelDto } from '../dtos/update-level.dto';

@Injectable()
export class LevelService {
  constructor(private readonly levelRepository: LevelRepository) {}

  async create({ lessonId, ...body }: CreateLevelDto) {
    return this.levelRepository.create({
      data: {
        Lesson: { connect: { id: lessonId } },
        ...body,
      },
    });
  }

  async find(query: FindLevelDto) {
    return this.levelRepository.findMany({
      where: { ...query },
    });
  }

  async findById(levelId: string) {
    return this.levelRepository.findUnique({ where: { id: levelId } });
  }

  async update(levelId: string, body: UpdateLevelDto) {
    return this.levelRepository.update({
      where: { id: levelId },
      data: { ...body },
    });
  }
}
