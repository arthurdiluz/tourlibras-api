import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repositories/student.repository';
import { CreateStudentDto } from '../dtos';

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
}
