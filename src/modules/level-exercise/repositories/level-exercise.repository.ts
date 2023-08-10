import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LevelExerciseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LessonLevelExerciseCreateArgs) {
    return this.prismaService.lessonLevelExercise.create(args);
  }
}
