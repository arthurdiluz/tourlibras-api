import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfessorMedalService } from '../services/professor-medal.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorMedalDto } from '../dtos/create-professor-medal.dto';
import { ProfessorService } from 'src/modules/professor/services/professor.service';

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
}
