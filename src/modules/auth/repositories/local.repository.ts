import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LocalAuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public linkUserToProfessor(id: string) {
    return this.prismaService.professor.create({
      data: { User: { connect: { id } } },
    });
  }

  public linkUserToStudent(id: string) {
    return this.prismaService.student.create({
      data: { User: { connect: { id } } },
    });
  }
}
