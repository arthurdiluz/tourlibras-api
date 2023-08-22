import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LessonLevelDoneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LessonLevelExerciseDoneCreateArgs) {
    return this.prismaService.lessonLevelExerciseDone.create(args);
  }
}
