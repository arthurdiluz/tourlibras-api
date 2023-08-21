import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentLessonRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.StudentOnLessonCreateArgs) {
    return this.prismaService.studentOnLesson.create(args);
  }
}
