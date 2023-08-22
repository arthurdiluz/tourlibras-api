import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentLessonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.StudentOnLessonCreateArgs) {
    return this.prismaService.studentOnLesson.create(args);
  }

  public findMany(args: Prisma.StudentOnLessonFindManyArgs) {
    return this.prismaService.studentOnLesson.findMany(args);
  }

  public findUnique(args: Prisma.StudentOnLessonFindUniqueArgs) {
    return this.prismaService.studentOnLesson.findFirst(args);
  }

  public update(args: Prisma.StudentOnLessonUpdateArgs) {
    return this.prismaService.studentOnLesson.update(args);
  }
}
