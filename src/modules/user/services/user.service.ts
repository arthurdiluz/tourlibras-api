import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, FindUserDto, UpdateUserDto } from '../dtos';
import { hash, verify, needsRehash } from 'argon2';

@Injectable()
export class UserService {
  private readonly selectValues = {
    _count: true,
    createdAt: true,
    updatedAt: true,
    id: true,
    isActive: true,
    fullName: true,
    email: true,
    password: false,
    profilePhoto: true,
  };

  constructor(private readonly userRepository: UserRepository) {}

  async create({ password, ...body }: CreateUserDto) {
    return this.userRepository.create({
      data: {
        password: await this.hashPassword(password),
        ...body,
      },
      select: { id: true },
    });
  }

  async find({ fullName, ...body }: FindUserDto) {
    return this.userRepository.findMany({
      where: {
        fullName: { contains: fullName, mode: 'insensitive' },
        ...body,
      },
      select: { ...this.selectValues },
    });
  }

  async findById(id: string) {
    return this.userRepository.findUnique({
      where: { id },
      select: { ...this.selectValues },
    });
  }

  async findByEmail(email: string) {
    return this.userRepository.findUnique({
      where: { email },
      select: { ...this.selectValues },
    });
  }

  async update(id: string, { password, ...body }: UpdateUserDto) {
    return this.userRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        password: await this.hashPassword(password),
        ...body,
      },
      select: { ...this.selectValues },
    });
  }

  async delete(id: string) {
    return this.userRepository.delete({ where: { id } });
  }

  async hashPassword(password: string): Promise<string> {
    let passwordHash: string = undefined;

    do {
      passwordHash = await hash(password);
    } while (
      needsRehash(passwordHash) &&
      (await verify(password, passwordHash))
    );

    return passwordHash;
  }
}
