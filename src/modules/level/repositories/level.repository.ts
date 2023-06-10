import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LevelRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LevelCreateArgs) {
    return this.prismaService.level.create(args);
  }

  public findMany(args: Prisma.LevelFindManyArgs) {
    return this.prismaService.level.findMany(args);
  }

  public findUnique(args: Prisma.LevelFindUniqueArgs) {
    return this.prismaService.level.findUnique(args);
  }

  public update(args: Prisma.LevelUpdateArgs) {
    return this.prismaService.level.update(args);
  }
}
