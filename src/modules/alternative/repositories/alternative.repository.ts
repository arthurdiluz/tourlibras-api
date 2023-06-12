import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AlternativeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.AlternativeCreateArgs) {
    return this.prismaService.alternative.create(args);
  }

  public findMany(args: Prisma.AlternativeFindManyArgs) {
    return this.prismaService.alternative.findMany(args);
  }
}
