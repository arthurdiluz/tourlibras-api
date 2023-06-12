import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class DoneExerciseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.DoneExerciseCreateArgs) {
    return this.prismaService.doneExercise.create(args);
  }

  public findMany(args: Prisma.DoneExerciseFindManyArgs) {
    return this.prismaService.doneExercise.findMany(args);
  }

  public findUnique(args: Prisma.DoneExerciseFindUniqueArgs) {
    return this.prismaService.doneExercise.findUnique(args);
  }

  public update(args: Prisma.DoneExerciseUpdateArgs) {
    return this.prismaService.doneExercise.update(args);
  }
}
