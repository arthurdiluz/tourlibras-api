import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../repositories/professor.repository';
import {
  CreateProfessorDto,
  FindProfessorDto,
  UpdateProfessorDto,
} from '../dtos';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class ProfessorService {
  constructor(
    private readonly professorRepository: ProfessorRepository,
    private readonly userService: UserService,
  ) {}

  async create({ userId, ...body }: CreateProfessorDto) {
    await this.userService.linkUserToRole(userId, 'PROFESSOR');

    return this.professorRepository.update({
      where: { userId },
      data: { ...body },
    });
  }

  async find({
    email,
    fullName,
    isActive,
    profilePhoto,
    grammar,
  }: FindProfessorDto) {
    return this.professorRepository.findMany({
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
    return this.professorRepository.findUnique({ where: { id: professorId } });
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
