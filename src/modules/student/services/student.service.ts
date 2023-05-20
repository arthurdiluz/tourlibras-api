import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repositories/student.repository';
import { CreateStudentDto, FindStudentDto, UpdateStudentDto } from '../dtos';

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create({ userId, professorId, ...body }: CreateStudentDto) {
    const data = {
      User: { connect: { id: userId } },
      ...body,
    };

    if (professorId) {
      data['Professor'] = { connect: { id: professorId } };
    }

    console.log('StudentCreateData:', data);
    return this.studentRepository.create({ data });
  }

  async find({
    email,
    fullName,
    isActive,
    profilePhoto,
    experience,
    money,
    theme,
  }: FindStudentDto) {
    return this.studentRepository.find({
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

  async update(id: string, { professorId, ...body }: UpdateStudentDto) {
    const data = {
      updatedAt: new Date(),
      ...body,
    };

    if (professorId) {
      data['Professor'] = { connect: { id: professorId } };
    }

    return this.studentRepository.update({ where: { id }, data });
  }
}
