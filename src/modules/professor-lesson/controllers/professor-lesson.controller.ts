import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfessorLessonService } from '../services/professor-lesson.service';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorLessonDto } from '../dtos/create-professor-lesson.dto';
import { ProfessorMedalService } from 'src/modules/professor-medal/services/professor-medal.service';

@Controller('professor')
export class ProfessorLessonController {
  constructor(
    private readonly professorLessonService: ProfessorLessonService,
    private readonly professorService: ProfessorService,
    private readonly medalService: ProfessorMedalService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/lesson')
  async create(
    @Param('id') id: number,
    @Body() body: CreateProfessorLessonDto,
  ) {
    const { medalId } = body;

    try {
      if (!(await this.professorService.findById(id))) {
        throw new BadRequestException(
          `Professor with ID #${id} does not exists`,
        );
      }

      if (medalId) {
        if (!(await this.medalService.findById(medalId))) {
          throw new BadRequestException(
            `Medal with ID #${medalId} does not exists`,
          );
        }
      }

      return await this.professorLessonService.create(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
