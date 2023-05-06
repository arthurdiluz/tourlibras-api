import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(args: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(args);
  }

  async findMany(args: Prisma.UserFindManyArgs) {
    return this.prismaService.user.findMany(args);
  }

  async findUnique(args: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(args);
  }

  async update(args: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(args);
  }

  async delete(args: Prisma.UserDeleteArgs) {
    return this.prismaService.user.delete(args);
  }
}
