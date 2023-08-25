import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LessonLevelRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LessonLevelCreateArgs) {
    return this.prismaService.lessonLevel.create(args);
  }

  public findMany(args: Prisma.LessonLevelFindManyArgs) {
    return this.prismaService.lessonLevel.findMany(args);
  }

  public findUnique(args: Prisma.LessonLevelFindUniqueArgs) {
    return this.prismaService.lessonLevel.findUnique(args);
  }

  public update(args: Prisma.LessonLevelUpdateArgs) {
    return this.prismaService.lessonLevel.update(args);
  }

  public delete(args: Prisma.LessonLevelDeleteArgs) {
    return this.prismaService.lessonLevel.delete(args);
  }
}
