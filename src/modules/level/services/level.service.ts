import { Injectable } from '@nestjs/common';
import { LevelRepository } from '../repositories/level.repository';
import { CreateLevelDto } from '../dtos/create-level.dto';

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
}
