import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MedalRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.MedalCreateArgs) {
    return this.prismaService.medal.create(args);
  }
}
