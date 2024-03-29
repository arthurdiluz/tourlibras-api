import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProfessorMedalRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.ProfessorMedalCreateArgs) {
    return this.prismaService.professorMedal.create(args);
  }

  public findMany(args: Prisma.ProfessorMedalFindManyArgs) {
    return this.prismaService.professorMedal.findMany(args);
  }

  public findUnique(args: Prisma.ProfessorMedalFindUniqueArgs) {
    return this.prismaService.professorMedal.findUnique(args);
  }

  public update(args: Prisma.ProfessorMedalUpdateArgs) {
    return this.prismaService.professorMedal.update(args);
  }

  public delete(args: Prisma.ProfessorMedalDeleteArgs) {
    return this.prismaService.professorMedal.delete(args);
  }
}
