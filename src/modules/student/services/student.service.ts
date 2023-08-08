import { Injectable } from '@nestjs/common';
import { FindStudentDto } from '../dtos/find-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {
  private studentInclude = {
    User: true,
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
          Professor: { id: professorId },
          fullName: { contains: fullName, mode: 'insensitive' },
          email,
          isActive,
          profilePhoto,
          role,
        },
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
}
