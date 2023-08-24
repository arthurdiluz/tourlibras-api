import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProfessorItemRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public create(args: Prisma.ProfessorItemCreateArgs) {
    return this.prismaService.professorItem.create(args);
  }
}
