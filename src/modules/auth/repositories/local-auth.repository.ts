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

  public signOut(userId: string) {
    return this.prismaService.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
  }

  public getRefreshToken(userId: string) {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  }
}
