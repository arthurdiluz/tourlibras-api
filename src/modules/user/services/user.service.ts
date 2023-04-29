import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, FindUserDto, UpdateUserDto } from '../dtos';

@Injectable()
export class UserService {
  private readonly selectValues = {
    _count: true,
    createdAt: true,
    updatedAt: true,
    id: true,
    isActive: true,
    fullName: true,
    username: true,
    password: false,
    profilePhoto: true,
  };

  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create({
      data: { ...createUserDto },
      select: { id: true },
    });
  }

  async find({ fullName, username, ...body }: FindUserDto) {
    return this.userRepository.findMany({
      where: {
        fullName: { contains: fullName, mode: 'insensitive' },
        username: { contains: username, mode: 'insensitive' },
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

  async findByUsername(username: string) {
    return this.userRepository.findUnique({
      where: { username },
      select: { ...this.selectValues },
    });
  }

  async update(id: string, body: UpdateUserDto) {
    return this.userRepository.update({
      where: { id },
      data: {
        // updatedAt: new Date(),
        ...body,
      },
      select: { ...this.selectValues },
    });
  }

  async delete(id: string) {
    return this.userRepository.delete({ where: { id } });
  }
}
