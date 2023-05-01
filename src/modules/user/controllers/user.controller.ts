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
  async create(@Body() { email, ...body }: CreateUserDto) {
    try {
      body.isActive = false;

      if ((await this.userService.findByEmail(email)) !== null) {
        throw new ConflictException(`Email "${email}" already exists`);
      }

      return await this.userService.create({ email, ...body });
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
    @Body() { email, ...body }: UpdateUserDto,
  ) {
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

      return this.userService.update(id, { email, ...body });
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
