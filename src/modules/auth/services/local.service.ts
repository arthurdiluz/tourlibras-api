import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtToken, IJwtPayload } from 'src/common/interfaces';
import { CreateJwtTokenDto } from '../dtos/jwt/create-jwt-token.dto';
import { JwtSignUpDto } from '../dtos/jwt/jwt-sign-up.dto';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/modules/user/services/user.service';
import { User } from '@prisma/client';

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
