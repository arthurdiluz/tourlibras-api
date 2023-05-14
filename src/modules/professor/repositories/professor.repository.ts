import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProfessorRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.ProfessorCreateArgs) {
    return this.prismaService.professor.create(args);
  }

  public find(args: Prisma.ProfessorFindManyArgs) {
    return this.prismaService.professor.findMany(args);
  }

  public findById(args: Prisma.ProfessorFindUniqueArgs) {
    return this.prismaService.professor.findUnique(args);
  }

  public findByUserId(userId: string) {
    return this.prismaService.professor.findUnique({ where: { userId } });
  }

  public update(args: Prisma.ProfessorUpdateArgs) {
    return this.prismaService.professor.update(args);
  }

  public delete(args: Prisma.ProfessorDeleteArgs) {
    return this.prismaService.professor.delete(args);
  }
}
