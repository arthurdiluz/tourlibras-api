import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(args);
  }

  public findMany(args: Prisma.UserFindManyArgs) {
    return this.prismaService.user.findMany(args);
  }

  public findUnique(args: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(args);
  }

  public update(args: Prisma.UserUpdateArgs) {
    return this.prismaService.user.update(args);
  }

  public delete(args: Prisma.UserDeleteArgs) {
    return this.prismaService.user.delete(args);
  }

  public addStudentRole(userId: number) {
    return this.prismaService.student.create({
      data: { User: { connect: { id: userId } } },
    });
  }

  public addProfessorRole(userId: number) {
    return this.prismaService.professor.create({
      data: { User: { connect: { id: userId } } },
    });
  }
}
