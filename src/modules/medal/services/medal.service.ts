import { Injectable } from '@nestjs/common';
import { MedalRepository } from '../repositories/medal.repository';
import { CreateMedalDto } from '../dtos/create-medal.dto';
import { FindMedalDto } from '../dtos/find-medal.dto';

@Injectable()
export class MedalService {
  constructor(private readonly medalRepository: MedalRepository) {}

  async create({ professorId, lessonId, ...body }: CreateMedalDto) {
    return this.medalRepository.create({
      data: {
        Professor: { connect: { id: professorId } },
        Lesson: { connect: { id: lessonId } },
        ...body,
      },
    });
  }

  async find({ name, description, ...query }: FindMedalDto) {
    return this.medalRepository.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
        description: { contains: description, mode: 'insensitive' },
        ...query,
      },
    });
  }

  async findById(medalId: string) {
    return this.medalRepository.findUnique({ where: { id: medalId } });
  }
}
