import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProfessorMedalService } from '../services/professor-medal.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorMedalDto } from '../dtos/create-professor-medal.dto';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { FindProfessorMedalDto } from '../dtos/find-professor-medal.dto';
import { UpdateProfessorMedalDto } from '../dtos/update-professor-medal.dto';

@Controller('professor')
export class ProfessorMedalController {
  constructor(
    private readonly professorMedalService: ProfessorMedalService,
    private readonly professorService: ProfessorService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/medal')
  async create(@Param('id') id: number, @Body() body: CreateProfessorMedalDto) {
    try {
      if (!(await this.professorService.findById(id))) {
        throw new BadRequestException(
          `Professor with ID #${id} does not exists`,
        );
      }

      return await this.professorMedalService.create(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/medal')
  async find(@Param('id') id: number, @Query() query: FindProfessorMedalDto) {
    try {
      if (!(await this.professorService.findById(id))) {
        throw new BadRequestException(
          `Professor with ID #${id} does not exists`,
        );
      }

      return await this.professorMedalService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':professorId/medal/:id')
  async findById(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
  ) {
    try {
      if (!(await this.professorService.findById(professorId))) {
        throw new BadRequestException(
          `Professor with ID #${professorId} does not exists`,
        );
      }

      const medal = await this.professorMedalService.findById(id);

      if (!medal) throw new NotFoundException(`Medal with ID #${id} not found`);

      return medal;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':professorId/medal/:id')
  async update(
    @Param('professorId') professorId: number,
    @Param('id') id: number,
    @Body() body: UpdateProfessorMedalDto,
  ) {
    try {
      if (!(await this.professorService.findById(professorId))) {
        throw new BadRequestException(
          `Professor with ID #${professorId} does not exists`,
        );
      }

      if (!(await this.professorMedalService.findById(id))) {
        throw new BadRequestException(`Medal with ID #${id} does not exists`);
      }

      return await this.professorMedalService.update(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
