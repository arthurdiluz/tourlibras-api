import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthService } from '../services/local-auth.service';
import { JwtSignInDto, JwtSignUpDto } from '../dtos/local';
import { UserService } from 'src/modules/user/services/user.service';
import { Professor, Student } from '@prisma/client';
import { IPayload, IToken } from 'src/common/interfaces';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('Local Authentication')
@Controller('api/v1/auth/local')
export class LocalAuthController {
  constructor(
    private readonly authService: LocalAuthService,
    private readonly userService: UserService,
  ) {}

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

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() { email, password }: JwtSignInDto): Promise<IToken> {
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

  @UseGuards(AuthGuard('jwt'))
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() req: Request) {
    try {
      const userId: string = req?.user['sub'];

      if (!(await this.userService.findById(userId))) {
        throw new NotFoundException(`User with ID "${userId}" not found`);
      }

      return await this.authService.signOut(userId);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request) {
    try {
      const { sub: userId, refreshToken } = req?.user as IPayload;

      if (!userId) {
        throw new NotFoundException('ID not found in request');
      }

      const user = await this.userService.findById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID "${userId}" not found`);
      }

      return await this.authService.updateRefreshToken(userId, refreshToken);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
