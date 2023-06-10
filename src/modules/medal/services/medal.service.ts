import { Injectable } from '@nestjs/common';
import { MedalRepository } from '../repositories/medal.repository';
import { CreateMedalDto } from '../dtos/create-medal.dto';

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
}
