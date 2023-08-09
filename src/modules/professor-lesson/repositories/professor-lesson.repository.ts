import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProfessorLessonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.ProfessorLessonCreateArgs) {
    return this.prismaService.professorLesson.create(args);
  }

  public findMany(args: Prisma.ProfessorLessonFindManyArgs) {
    return this.prismaService.professorLesson.findMany(args);
  }

  public findUnique(args: Prisma.ProfessorLessonFindUniqueArgs) {
    return this.prismaService.professorLesson.findUnique(args);
  }

  public update(args: Prisma.ProfessorLessonUpdateArgs) {
    return this.prismaService.professorLesson.update(args);
  }
}
