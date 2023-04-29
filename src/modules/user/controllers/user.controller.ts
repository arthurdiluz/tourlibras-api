import {
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
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto, FindUserDto, UpdateUserDto } from '../dtos';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { username, ...body }: CreateUserDto) {
    try {
      body.isActive = false;

      if ((await this.userService.findByUsername(username)) !== null) {
        throw new ConflictException(`Username "${username}" already exists`);
      }

      return await this.userService.create({ username, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @Get()
  async find(@Query() query: FindUserDto) {
    try {
      return await this.userService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @HttpCode(HttpStatus.FOUND)
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
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

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() { username, ...body }: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      if (username) {
        if (
          (await this.userService.findByUsername(username)) &&
          username !== user.username
        ) {
          throw new ConflictException(`Username "${username}" already exists`);
        }
      }

      if (username && (await this.userService.findByUsername(username))) {
        throw new ConflictException(`Username "${username}" already exists`);
      }

      return this.userService.update(id, { username, ...body });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
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
