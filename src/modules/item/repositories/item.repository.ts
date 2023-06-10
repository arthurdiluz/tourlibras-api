import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.ItemCreateArgs) {
    return this.prismaService.item.create(args);
  }

  public find(args: Prisma.ItemFindManyArgs) {
    return this.prismaService.item.findMany(args);
  }

  public findById(args: Prisma.ItemFindUniqueArgs) {
    return this.prismaService.item.findUnique(args);
  }

  public update(args: Prisma.ItemUpdateArgs) {
    return this.prismaService.item.update(args);
  }

  public delete(args: Prisma.ItemDeleteArgs) {
    return this.prismaService.item.delete(args);
  }
}
