import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StudentItemRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
