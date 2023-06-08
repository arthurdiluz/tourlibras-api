import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repositories/student.repository';
import { CreateStudentDto, FindStudentDto, UpdateStudentDto } from '../dtos';
import { UserService } from 'src/modules/user/services/user.service';

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

  async findById(id: string) {
    return this.studentRepository.findById({ where: { id } });
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

  async delete(id: string) {
    return this.studentRepository.delete({ where: { id } });
  }
}
