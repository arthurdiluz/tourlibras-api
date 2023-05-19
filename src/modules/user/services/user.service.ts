import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, FindUserDto, UpdateUserDto } from '../dtos';
import { removeKeys, hashString } from 'src/common/helpers';
import { verify } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ password, profilePhoto, ...body }: CreateUserDto) {
    const user = await this.userRepository.create({
      data: {
        profilePhoto:
          profilePhoto ||
          'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
        password: await hashString(password),
        ...body,
      },
    });

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

  async findById(id: string) {
    const user = await this.userRepository.findUnique({ where: { id } });

    if (!user) return null;

    return removeKeys(user, ['password']);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findUnique({ where: { email } });

    if (!user) return null;

    return removeKeys(user, ['password']);
  }

  async update(id: string, { password, profilePhoto, ...body }: UpdateUserDto) {
    const user = await this.userRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        profilePhoto:
          profilePhoto ||
          'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
        password: await hashString(password),
        ...body,
      },
    });

    return removeKeys(user, ['password']);
  }

  async delete(id: string) {
    const user = await this.userRepository.delete({ where: { id } });
    return removeKeys(user, ['password']);
  }

  async isValidCredentials(email: string, password: string) {
    const user = await this.userRepository.findUnique({
      where: { email },
    });

    return user && (await verify(user.password, password));
  }
}
