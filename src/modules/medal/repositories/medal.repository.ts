import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MedalRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.MedalCreateArgs) {
    return this.prismaService.medal.create(args);
  }

  public findMany(args: Prisma.MedalFindManyArgs) {
    return this.prismaService.medal.findMany(args);
  }

  public findUnique(args: Prisma.MedalFindUniqueArgs) {
    return this.prismaService.medal.findUnique(args);
  }

  public update(args: Prisma.MedalUpdateArgs) {
    return this.prismaService.medal.update(args);
  }

  public delete(args: Prisma.MedalDeleteArgs) {
    return this.prismaService.medal.delete(args);
  }
}
