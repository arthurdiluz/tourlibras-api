import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.StudentCreateArgs) {
    return this.prismaService.student.create(args);
  }

  public findMany(args: Prisma.StudentFindManyArgs) {
    return this.prismaService.student.findMany(args);
  }

  public findUnique(args: Prisma.StudentFindUniqueArgs) {
    return this.prismaService.student.findUnique(args);
  }

  public update(args: Prisma.StudentUpdateArgs) {
    return this.prismaService.student.update(args);
  }

  public delete(args: Prisma.StudentDeleteArgs) {
    return this.prismaService.student.delete(args);
  }
}
