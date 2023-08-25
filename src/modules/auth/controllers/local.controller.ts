import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalAuthService } from '../services/local.service';
import { UserService } from 'src/modules/user/services/user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { IJwtToken } from 'src/common/interfaces/jwt-token.interface';
import { JwtSignUpDto } from '../dtos/jwt/jwt-sign-up.dto';
import { JwtSignInDto } from '../dtos/jwt/jwt-sign-in.dto';
import { User } from '@prisma/client';

@Controller('auth/local')
export class LocalAuthController {
  constructor(
    private readonly authService: LocalAuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() body: JwtSignUpDto): Promise<Omit<User, 'password'>> {
    try {
      const { email } = body;

      if ((await this.userService.findByEmail(email)) !== null) {
        throw new ConflictException(`Email "${email}" already exists`);
      }

      return await this.authService.signUp(body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() { email, password }: JwtSignInDto): Promise<IJwtToken> {
    try {
      if (!(await this.userService.isValidCredentials({ email, password }))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return await this.authService.signIn({ email, password });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
