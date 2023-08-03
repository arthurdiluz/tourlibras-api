import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { FindStudentDto } from '../dtos/find-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { StudentRepository } from '../repositories/student.repository';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly userService: UserService,
  ) {}

  async create({ userId, professorId, ...body }: CreateStudentDto) {
    const data = {
      User: { connect: { id: userId } },
      ...body,
    };

    if (professorId) {
      data['Professor'] = { connect: { id: professorId } };
    }

    await this.userService.linkUserToRole(userId, 'STUDENT');

    return this.studentRepository.update({ where: { userId }, data });
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

  async findById(studentId: string) {
    return this.studentRepository.findUnique({ where: { id: studentId } });
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

  async delete(studentId: string) {
    return this.studentRepository.delete({ where: { id: studentId } });
  }
}
