import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../repositories/professor.repository';
import { CreateProfessorDto } from '../dtos';
import { hashString } from 'src/common/helpers';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

  async create({ userId, ...body }: CreateProfessorDto) {
    return this.professorRepository.create({
      data: {
        User: { connect: { id: userId } },
        ...body,
      },
    });
  }
}
