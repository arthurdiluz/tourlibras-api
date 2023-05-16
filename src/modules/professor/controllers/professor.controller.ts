import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfessorService } from '../services/professor.service';
import { CreateProfessorDto } from '../dtos';
import { UserService } from 'src/modules/user/services/user.service';
import { Public } from 'src/common/decorators';

@ApiTags('Professor')
@Controller('api/v1/professor')
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
}
