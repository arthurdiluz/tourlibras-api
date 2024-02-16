import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { FindStudentDto } from '../dtos/find-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {
  private include: Prisma.StudentInclude<DefaultArgs> = {
    User: {
      select: {
        id: true,
        isActive: true,
        fullName: true,
        email: true,
        profilePhoto: true,
        role: true,
      },
    },
    Professor: true,
    Lessons: true,
    Medals: { include: { Medal: true } },
    Items: true,
  };

  constructor(private readonly studentRepository: StudentRepository) {}

  async find({
    email,
    fullName,
    isActive,
    profilePhoto,
    experience,
    money,
    theme,
    professorId,
    role,
    search,
    sortBy = 'Experience',
  }: FindStudentDto) {
    return this.studentRepository.findMany({
      where: {
        User: {
          fullName: { contains: fullName || search, mode: 'insensitive' },
          email,
          isActive,
          profilePhoto,
          role,
        },
        Professor: { id: professorId },
        experience,
        money,
        theme,
      },
      orderBy: {
        [sortBy.toLowerCase()]: sortBy ? 'desc' : undefined,
      },
      include: this.include,
    });
  }

  async findById(studentId: number) {
    return this.studentRepository.findUnique({
      where: { id: studentId },
      include: this.include,
    });
  }

  async update(id: number, { professorId, ...body }: UpdateStudentDto) {
    return this.studentRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        Professor: professorId ? { connect: { id: professorId } } : undefined,
        ...body,
      },
      include: this.include,
    });
  }

  async delete(studentId: number) {
    return this.studentRepository.delete({
      where: { id: studentId },
      include: this.include,
    });
  }

  async addMedal(studentId: number, medalId: number) {
    const whereClause = { medalId_studentId: { medalId, studentId } };
    const studentHasMedal = !!(await this.studentRepository.findMedal({
      where: whereClause,
    }));

    if (studentHasMedal) {
      return this.studentRepository.updateMedal({
        where: { medalId_studentId: { medalId, studentId } },
        data: { amount: { increment: 1 } },
        include: { Student: true, Medal: true },
      });
    }

    return this.studentRepository.addMedal({
      data: {
        amount: 1,
        Student: { connect: { id: studentId } },
        Medal: { connect: { id: medalId } },
      },
      include: { Student: true, Medal: true },
    });
  }

  async joinProfessor(studentId: number, professorId: number) {
    return this.studentRepository.linkProfessor(studentId, professorId);
  }

  async leaveProfessor(studentId: number, professorId: number) {
    return this.studentRepository.unlinkProfessor(studentId, professorId);
  }
}
