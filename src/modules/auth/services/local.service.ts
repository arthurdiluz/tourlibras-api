import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/modules/user/services/user.service';
import { CreateJwtTokenDto, JwtSignUpDto } from '../dtos/jwt';
import { User } from '@prisma/client';
import { IJwtPayload, IJwtToken } from 'src/common/interfaces';

@Injectable()
export class LocalAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signUp({
    role,
    ...body
  }: JwtSignUpDto): Promise<Omit<User, 'password'>> {
    return this.userService.create({ role, ...body });
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
