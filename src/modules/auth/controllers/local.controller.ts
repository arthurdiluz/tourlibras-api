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
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthService } from '../services/local.service';
import { JwtSignInDto, JwtSignUpDto } from '../dtos/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { Professor, Student } from '@prisma/client';
import { Public } from 'src/common/decorators';
import { IJwtToken } from 'src/common/interfaces';

@ApiTags('Authentication - Local')
@Controller('api/v1/auth/local')
export class LocalAuthController {
  constructor(
    private readonly authService: LocalAuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() { email, ...body }: JwtSignUpDto,
  ): Promise<Student | Professor> {
    try {
      if ((await this.userService.findByEmail(email)) !== null) {
        throw new ConflictException(`Email "${email}" already exists`);
      }

      return await this.authService.signUp({ email, ...body });
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
      if (!(await this.userService.isValidCredentials(email, password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return await this.authService.signIn(email);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
