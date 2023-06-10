import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LevelRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.LevelCreateArgs) {
    return this.prismaService.level.create(args);
  }
}
