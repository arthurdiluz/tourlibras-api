import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MedalService } from '../services/medal.service';
import { CreateMedalDto } from '../dtos/create-medal.dto';
import { ProfessorService } from 'src/modules/professor/services/professor.service';

@ApiTags('Medal')
@Controller('medal')
export class MedalController {
  constructor(
    private readonly medalService: MedalService,
    private readonly professorService: ProfessorService,
  ) {}

  @Post()
  async create({ professorId, lessonId, ...body }: CreateMedalDto) {
    try {
      if (!(await this.professorService.findById(professorId))) {
        throw new NotFoundException(
          `Professor with ID "${professorId}" not found`,
        );
      }

      // TODO: add lesson validation

      return await this.medalService.create({ professorId, lessonId, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
