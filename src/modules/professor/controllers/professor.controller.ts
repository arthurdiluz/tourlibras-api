import {
  Controller,
  Post,
  Body,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
  Get,
  Query,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { CreateProfessorDto } from '../dtos/create-professor.dto';
import { FindProfessorDto } from '../dtos/find-professor.dto';
import { UpdateProfessorDto } from '../dtos/update-professor.dto';
import { ProfessorService } from '../services/professor.service';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';

@Controller('professor')
export class ProfessorController {
  constructor(
    private readonly professorService: ProfessorService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post()
  async create(@Body() { userId, ...body }: CreateProfessorDto) {
    try {
      if (!(await this.userService.findById(userId))) {
        throw new NotFoundException(`User with ID "${userId}" not found`);
      }

      return await this.professorService.create({ userId, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindProfessorDto) {
    try {
      return await this.professorService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param() id: number) {
    try {
      const professor = await this.professorService.findById(id);

      if (!professor) {
        throw new NotFoundException(`Professor with ID "${id}" not found`);
      }

      return professor;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(@Param() id: number, @Body() body: UpdateProfessorDto) {
    try {
      if (!(await this.professorService.findById(id))) {
        throw new NotFoundException(`Professor with ID "${id}" not found`);
      }

      return await this.professorService.update(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param() id: number) {
    try {
      return await this.professorService.delete(id);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
