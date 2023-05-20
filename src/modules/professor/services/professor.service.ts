import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../repositories/professor.repository';
import {
  CreateProfessorDto,
  FindProfessorDto,
  UpdateProfessorDto,
} from '../dtos';
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

  async find({ grammar, fullName, ...query }: FindProfessorDto) {
    return this.professorRepository.find({
      where: {
        grammar,
        User: {
          fullName: { contains: fullName, mode: 'insensitive' },
          ...query,
        },
      },
    });
  }

  async findById(professorId: string) {
    return this.professorRepository.findById({ where: { id: professorId } });
  }

  async findByUserId(userId: string) {
    return this.professorRepository.findByUserId(userId);
  }

  async update(
    userId: string,
    { password, profilePhoto, grammar, ...userBody }: UpdateProfessorDto,
  ) {
    return this.professorRepository.update({
      where: { userId },
      data: {
        grammar,
        User: {
          update: {
            updatedAt: new Date(),
            profilePhoto:
              profilePhoto ||
              'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
            password: await hashString(password),
            ...userBody,
          },
        },
      },
    });
  }

  async delete(id: string) {
    return this.professorRepository.delete({ where: { id } });
  }
}
