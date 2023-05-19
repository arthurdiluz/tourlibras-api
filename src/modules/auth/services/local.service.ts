import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/modules/user/services/user.service';
import { LocalAuthRepository } from '../repositories/local.repository';
import { CreateJwtTokenDto, JwtSignUpDto } from '../dtos/jwt';
import { Professor, Student } from '@prisma/client';
import { IJwtPayload } from 'src/common/interfaces';

@Injectable()
export class LocalAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly localAuthRepository: LocalAuthRepository,
  ) {}

  async signUp({
    isProfessor,
    ...body
  }: JwtSignUpDto): Promise<Professor | Student> {
    const { id } = await this.userService.create({ ...body });

    if (isProfessor) {
      return this.localAuthRepository.linkUserToProfessor(id);
    } else {
      return this.localAuthRepository.linkUserToStudent(id);
    }
  }

  async signIn(email: string): Promise<string> {
    const { id: userId } = await this.userService.findByEmail(email);

    return this.createJwtToken({ userId, email });
  }

  private async createJwtToken({
    userId,
    email,
  }: CreateJwtTokenDto): Promise<string> {
    const payload: IJwtPayload = {
      sub: userId,
      email: email,
    };

    return this.jwtService.signAsync(payload, {
      secret: this.configService.getJwtAccessSecret,
    });
  }
}
