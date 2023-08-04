import { Injectable } from '@nestjs/common';
import { FindStudentDto } from '../dtos/find-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async find({
    email,
    fullName,
    isActive,
    profilePhoto,
    experience,
    money,
    theme,
  }: FindStudentDto) {
    return this.studentRepository.findMany({
      where: {
        User: {
          fullName: { contains: fullName, mode: 'insensitive' },
          email,
          isActive,
          profilePhoto,
        },
        experience,
        money,
        theme,
      },
    });
  }

  async findById(studentId: number) {
    return this.studentRepository.findUnique({ where: { id: studentId } });
  }

  async update(id: number, { professorId, ...body }: UpdateStudentDto) {
    const data = {
      updatedAt: new Date(),
      ...body,
    };

    if (professorId) {
      data['Professor'] = { connect: { id: professorId } };
    }

    return this.studentRepository.update({ where: { id }, data });
  }

  async delete(studentId: number) {
    return this.studentRepository.delete({ where: { id: studentId } });
  }
}
