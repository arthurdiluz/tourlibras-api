import { Injectable } from '@nestjs/common';
import { FindProfessorDto } from '../dtos/find-professor.dto';
import { UpdateProfessorDto } from '../dtos/update-professor.dto';
import { ProfessorRepository } from '../repositories/professor.repository';
import { StudentService } from 'src/modules/student/services/student.service';

@Injectable()
export class ProfessorService {
  private professorInclude = {
    User: true,
    Students: true,
    Medals: true,
    Items: true,
  };

  constructor(
    private readonly professorRepository: ProfessorRepository,
    private readonly studentService: StudentService,
  ) {}

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
      include: { ...this.professorInclude },
    });
  }

  async findById(professorId: number) {
    return this.professorRepository.findUnique({
      where: { id: professorId },
      include: { ...this.professorInclude },
    });
  }

  async leaderboard(professorId: number) {
    const result = await this.studentService.find({ professorId });
    console.log({ result });
    return result;
  }

  async update(id: number, body: UpdateProfessorDto) {
    return this.professorRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        ...body,
      },
      include: { ...this.professorInclude },
    });
  }

  async delete(professorId: number) {
    return this.professorRepository.delete({
      where: { id: professorId },
      include: { ...this.professorInclude },
    });
  }
}
