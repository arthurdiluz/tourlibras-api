import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LessonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LessonCreateArgs) {
    return this.prismaService.lesson.create(args);
  }

  public findMany(args: Prisma.LessonFindManyArgs) {
    return this.prismaService.lesson.findMany(args);
  }
}
