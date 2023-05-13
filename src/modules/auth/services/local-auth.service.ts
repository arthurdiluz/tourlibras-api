import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Professor, Student } from '@prisma/client';
import { IToken } from 'src/common/interfaces';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/modules/user/services/user.service';
import { LocalAuthRepository } from '../repositories/local-auth.repository';
import { CreateTokensDto, JwtSignUpDto } from '../dtos/local';
import { verify } from 'argon2';

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

  async signIn(email: string): Promise<IToken> {
    const { id: userId } = await this.userService.findByEmail(email);
    const tokens = await this.createTokens({
      userId,
      email,
    });

    await this.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  async signOut(userId: string) {
    return this.localAuthRepository.signOut(userId);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const { refreshToken: currentHashRefreshToken, email } =
      await this.localAuthRepository.getRefreshToken(userId);

    if (currentHashRefreshToken) {
      if (!(await verify(currentHashRefreshToken, refreshToken))) {
        throw new Error('Invalid refresh token');
      }
    }

    const newTokens = await this.createTokens({ userId, email });

    if (!newTokens) {
      throw new Error('Could not create new tokens');
    }

    await this.userService.update(userId, {
      refreshToken: newTokens.refreshToken,
    });

    return newTokens;
  }

  private async createTokens({
    userId,
    email,
  }: CreateTokensDto): Promise<IToken> {
    const [accessToken, refreshToken] = await Promise.all([
      // ACCESS TOKEN
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.getJwtAccessSecret,
          expiresIn: this.configService.getAccessTokenExpiresIn,
        },
      ),
      // REFRESH TOKEN
      this.jwtService.signAsync(
        {
          sub: userId,
          email: email,
        },
        {
          secret: this.configService.getJwtRefreshSecret,
          expiresIn: this.configService.getRefreshTokenExpiresIn,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
