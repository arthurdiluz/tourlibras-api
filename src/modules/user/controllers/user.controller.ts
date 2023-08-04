import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Public } from 'src/common/decorators';
import { CreateUserDto } from '../dtos/create-user.dto';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { FindUserDto } from '../dtos/find-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() { email, ...body }: CreateUserDto) {
    try {
      if ((await this.userService.findByEmail(email)) !== null) {
        throw new ConflictException(`Email "${email}" already exists`);
      }

      return await this.userService.create({ email, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindUserDto) {
    try {
      return await this.userService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param() id: number) {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      return user;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(@Param() id: number, @Body() { email, ...body }: UpdateUserDto) {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      if (email) {
        if (email === user.email) {
          throw new BadRequestException(`Your email is already "${email}"`);
        }

        if (
          (await this.userService.findByEmail(email)) &&
          email !== user.email
        ) {
          throw new ConflictException(`Email "${email}" already exists`);
        }
      }

      if (email && (await this.userService.findByEmail(email))) {
        throw new ConflictException(`Email "${email}" already exists`);
      }

      return await this.userService.update(id, { email, ...body });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() id: number) {
    try {
      const user = await this.userService.delete(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      return await this.userService.delete(id);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
