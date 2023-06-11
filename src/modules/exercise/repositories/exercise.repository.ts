import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ExerciseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.ExerciseCreateArgs) {
    return this.prismaService.exercise.create(args);
  }

  public findMany(args: Prisma.ExerciseFindManyArgs) {
    return this.prismaService.exercise.findMany(args);
  }

  public findUnique(args: Prisma.ExerciseFindUniqueArgs) {
    return this.prismaService.exercise.findUnique(args);
  }
}
