import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class DoneExerciseRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.DoneExerciseCreateArgs) {
    return this.prismaService.doneExercise.create(args);
  }
}
