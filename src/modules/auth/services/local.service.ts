import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/modules/user/services/user.service';
import { LocalAuthRepository } from '../repositories/local.repository';
import { CreateJwtTokenDto, JwtSignUpDto } from '../dtos/jwt';
import { Professor, Student } from '@prisma/client';
import { IJwtPayload, IJwtToken } from 'src/common/interfaces';

@Injectable()
export class LocalAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly localAuthRepository: LocalAuthRepository,
  ) {}

  async signUp({ role, ...body }: JwtSignUpDto): Promise<Professor | Student> {
    const { id } = await this.userService.create({ role, ...body });

    return role === 'PROFESSOR'
      ? this.localAuthRepository.linkUserToProfessor(id)
      : this.localAuthRepository.linkUserToStudent(id);
  }

  async signIn(email: string): Promise<IJwtToken> {
    const { id: userId } = await this.userService.findByEmail(email);
    const accessToken = await this.createJwtToken({ userId, email });

    return { accessToken };
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
      expiresIn: this.configService.getAccessTokenExpiresIn,
    });
  }
}
