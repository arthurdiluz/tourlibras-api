import { Injectable } from '@nestjs/common';
import { FindProfessorDto } from '../dtos/find-professor.dto';
import { UpdateProfessorDto } from '../dtos/update-professor.dto';
import { ProfessorRepository } from '../repositories/professor.repository';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}

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

  async findById(professorId: number) {
    return this.professorRepository.findUnique({ where: { id: professorId } });
  }

  async update(id: number, body: UpdateProfessorDto) {
    return this.professorRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        ...body,
      },
    });
  }

  async delete(professorId: number) {
    return this.professorRepository.delete({ where: { id: professorId } });
  }
}
