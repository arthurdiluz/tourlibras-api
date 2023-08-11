import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ExerciseAlternativeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public findMany(args: Prisma.LessonLevelExerciseAlternativeFindManyArgs) {
    return this.prismaService.lessonLevelExerciseAlternative.findMany(args);
  }

  public findById(args: Prisma.LessonLevelExerciseAlternativeFindUniqueArgs) {
    return this.prismaService.lessonLevelExerciseAlternative.findUnique(args);
  }

  public update(args: Prisma.LessonLevelExerciseAlternativeUpdateArgs) {
    return this.prismaService.lessonLevelExerciseAlternative.update(args);
  }

  public delete(args: Prisma.LessonLevelExerciseAlternativeDeleteArgs) {
    return this.prismaService.lessonLevelExerciseAlternative.delete(args);
  }
}
