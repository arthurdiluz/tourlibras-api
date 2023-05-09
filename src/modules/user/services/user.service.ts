import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, FindUserDto, UpdateUserDto } from '../dtos';
import { excludeKeysFromUser, hashPassword } from 'src/common/helpers';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ password, profilePhoto, ...body }: CreateUserDto) {
    const user = await this.userRepository.create({
      data: {
        profilePhoto:
          profilePhoto ||
          'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
        password: await hashPassword(password),
        ...body,
      },
    });

    return excludeKeysFromUser(user, ['password']);
  }

  async find({ fullName, ...body }: FindUserDto) {
    const users = await this.userRepository.findMany({
      where: {
        fullName: { contains: fullName, mode: 'insensitive' },
        ...body,
      },
    });

    return users.map((user) => excludeKeysFromUser(user, ['password']));
  }

  async findById(id: string) {
    const user = await this.userRepository.findUnique({ where: { id } });

    if (!user) return null;

    return excludeKeysFromUser(user, ['password']);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findUnique({ where: { email } });

    if (!user) return null;

    return excludeKeysFromUser(user, ['password']);
  }

  async update(id: string, { password, profilePhoto, ...body }: UpdateUserDto) {
    const user = await this.userRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        profilePhoto:
          profilePhoto ||
          'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
        password: await hashPassword(password),
        ...body,
      },
    });

    return excludeKeysFromUser(user, ['password']);
  }

  async delete(id: string) {
    const user = await this.userRepository.delete({ where: { id } });
    return excludeKeysFromUser(user, ['password']);
  }
}
