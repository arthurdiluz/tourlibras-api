import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LessonLevelDoneRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LessonLevelDoneCreateArgs) {
    return this.prismaService.lessonLevelDone.create(args);
  }

  public findMany(args: Prisma.LessonLevelDoneFindManyArgs) {
    return this.prismaService.lessonLevelDone.findMany(args);
  }

  public findUnique(args: Prisma.LessonLevelDoneFindUniqueArgs) {
    return this.prismaService.lessonLevelDone.findUnique(args);
  }
}
