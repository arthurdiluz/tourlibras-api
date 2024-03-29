import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LevelExerciseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LessonLevelExerciseCreateArgs) {
    return this.prismaService.lessonLevelExercise.create(args);
  }

  public findMany(args: Prisma.LessonLevelExerciseFindManyArgs) {
    return this.prismaService.lessonLevelExercise.findMany(args);
  }

  public findUnique(args: Prisma.LessonLevelExerciseFindUniqueArgs) {
    return this.prismaService.lessonLevelExercise.findUnique(args);
  }

  public update(args: Prisma.LessonLevelExerciseUpdateArgs) {
    return this.prismaService.lessonLevelExercise.update(args);
  }

  public delete(args: Prisma.LessonLevelExerciseDeleteArgs) {
    return this.prismaService.lessonLevelExercise.delete(args);
  }

  public findAlternative(
    args: Prisma.LessonLevelExerciseAlternativeFindUniqueArgs,
  ) {
    return this.prismaService.lessonLevelExerciseAlternative.findUnique(args);
  }
}
