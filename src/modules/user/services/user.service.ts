import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { hashString, removeKeys } from 'src/common/helpers';
import { FindUserDto } from '../dtos/find-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { verify } from 'argon2';
import { Professor, ROLE, Student } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ password, role, ...body }: CreateUserDto) {
    const user = await this.userRepository.create({
      data: {
        password: await hashString(password),
        role,
        ...body,
      },
    });

    if (role) {
      await this.linkUserToRole(user.id, user.role);
    }

    return removeKeys(user, ['password']);
  }

  async find({ fullName, ...body }: FindUserDto) {
    const users = await this.userRepository.findMany({
      where: {
        fullName: { contains: fullName, mode: 'insensitive' },
        ...body,
      },
    });

    return users.map((user) => removeKeys(user, ['password']));
  }

  async findById(userId: string) {
    const user = await this.userRepository.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return removeKeys(user, ['password']);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findUnique({ where: { email } });

    if (!user) return null;

    return removeKeys(user, ['password']);
  }

  async update(id: string, { password, ...body }: UpdateUserDto) {
    const user = await this.userRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        password: await hashString(password),
        ...body,
      },
    });

    return removeKeys(user, ['password']);
  }

  async delete(userId: string) {
    const user = await this.userRepository.delete({ where: { id: userId } });
    return removeKeys(user, ['password']);
  }

  async isValidCredentials(email: string, password: string) {
    const user = await this.userRepository.findUnique({
      where: { email },
    });

    return user && (await verify(user.password, password));
  }

  async linkUserToRole(
    userId: string,
    role: ROLE,
  ): Promise<Student | Professor> {
    await this.userRepository.update({ where: { id: userId }, data: { role } });

    return role === 'STUDENT'
      ? this.userRepository.addStudentRole(userId)
      : this.userRepository.addProfessorRole(userId);
  }
}
