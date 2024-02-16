import { Injectable, NotFoundException } from '@nestjs/common';
import { FindProfessorDto } from '../dtos/find-professor.dto';
import { UpdateProfessorDto } from '../dtos/update-professor.dto';
import { ProfessorRepository } from '../repositories/professor.repository';
import { StudentService } from 'src/modules/student/services/student.service';
import { Prisma } from '@prisma/client';
import { LeaderboardDto } from '../dtos/leaderboard.dto';

@Injectable()
export class ProfessorService {
  private professorInclude = {
    User: {
      select: {
        createdAt: true,
        updatedAt: true,
        id: true,
        isActive: true,
        fullName: true,
        email: true,
        profilePhoto: true,
        role: true,
      },
    },
    Students: true,
    Medals: true,
    Items: true,
    Lessons: true,
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
    search,
    sortBy = 'Students',
  }: FindProfessorDto) {
    return this.professorRepository.findMany({
      where: {
        User: {
          fullName: { contains: fullName || search, mode: 'insensitive' },
          email,
          isActive,
          profilePhoto,
        },
        grammar,
      },
      orderBy: {
        [sortBy]: {
          _count: 'desc',
        },
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

  async leaderboard(
    professorId: number,
    { experience, money }: LeaderboardDto,
  ) {
    return this.professorRepository.leaderboard({
      where: { Professor: { id: professorId } },
      orderBy: { experience, money },
      include: {
        User: { select: { fullName: true, email: true, profilePhoto: true } },
      },
    });
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

  async removeStudent(professorId: number, studentId: number) {
    const professor = await this.findById(professorId);
    const professorStudents: Array<Prisma.StudentWhereInput> =
      professor['Students'];

    const studentToRemove = professorStudents.find(
      (student) => student.id === studentId,
    );

    if (!studentToRemove) {
      throw new NotFoundException(
        `Could not find Student with #${studentId} in Professor ID #${professorId}`,
      );
    }

    return await this.studentService.leaveProfessor(studentId, professorId);
  }
}
