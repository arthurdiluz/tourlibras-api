import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../repositories/professor.repository';
import {
  CreateProfessorDto,
  FindProfessorDto,
  UpdateProfessorDto,
} from '../dtos';

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

  async find({
    email,
    fullName,
    isActive,
    profilePhoto,
    grammar,
  }: FindProfessorDto) {
    return this.professorRepository.find({
      where: {
        User: {
          fullName: { contains: fullName, mode: 'insensitive' },
          email,
          isActive,
          profilePhoto,
        },
        grammar,
      },
    });
  }

  async findById(professorId: string) {
    return this.professorRepository.findById({ where: { id: professorId } });
  }

  async findByUserId(userId: string) {
    return this.professorRepository.findById({ where: { userId } });
  }

  async update(id: string, body: UpdateProfessorDto) {
    return this.professorRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        ...body,
      },
    });
  }

  async delete(id: string) {
    return this.professorRepository.delete({ where: { id } });
  }
}
