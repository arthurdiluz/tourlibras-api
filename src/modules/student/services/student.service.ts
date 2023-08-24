import { Injectable } from '@nestjs/common';
import { FindStudentDto } from '../dtos/find-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {
  private studentInclude = {
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
    Medals: true,
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
  }: FindStudentDto) {
    return this.studentRepository.findMany({
      where: {
        User: {
          fullName: { contains: fullName, mode: 'insensitive' },
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
      include: { ...this.studentInclude },
    });
  }

  async findById(studentId: number) {
    return this.studentRepository.findUnique({
      where: { id: studentId },
      include: { ...this.studentInclude },
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
      include: { ...this.studentInclude },
    });
  }

  async delete(studentId: number) {
    return this.studentRepository.delete({
      where: { id: studentId },
      include: { ...this.studentInclude },
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
}
