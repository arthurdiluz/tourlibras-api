import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, FindUserDto, UpdateUserDto } from '../dtos';
import { hash, verify, needsRehash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ password, profilePhoto, ...body }: CreateUserDto) {
    const user = await this.userRepository.create({
      data: {
        profilePhoto:
          profilePhoto ||
          'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
        password: await this.hashPassword(password),
        ...body,
      },
    });

    return this.excludeKeysFromUser(user, ['password']);
  }

  async find({ fullName, ...body }: FindUserDto) {
    const users = await this.userRepository.findMany({
      where: {
        fullName: { contains: fullName, mode: 'insensitive' },
        ...body,
      },
    });

    return users.map((user) => this.excludeKeysFromUser(user, ['password']));
  }

  async findById(id: string) {
    const user = await this.userRepository.findUnique({ where: { id } });

    if (!user) return null;

    return this.excludeKeysFromUser(user, ['password']);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findUnique({ where: { email } });

    if (!user) return null;

    return this.excludeKeysFromUser(user, ['password']);
  }

  async update(id: string, { password, profilePhoto, ...body }: UpdateUserDto) {
    const user = await this.userRepository.update({
      where: { id },
      data: {
        updatedAt: new Date(),
        profilePhoto:
          profilePhoto ||
          'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
        password: await this.hashPassword(password),
        ...body,
      },
    });

    return this.excludeKeysFromUser(user, ['password']);
  }

  async delete(id: string) {
    const user = await this.userRepository.delete({ where: { id } });
    console.log(user);

    return this.excludeKeysFromUser(user, ['password']);
  }

  private async hashPassword(password: string): Promise<string> {
    let passwordHash: string = undefined;

    do {
      passwordHash = await hash(password);
    } while (
      needsRehash(passwordHash) &&
      (await verify(password, passwordHash))
    );

    return passwordHash;
  }

  private excludeKeysFromUser<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}
