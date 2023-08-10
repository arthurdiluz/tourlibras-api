import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonLevelService } from '../services/lesson-level.service';
import { ProfessorLessonService } from 'src/modules/professor-lesson/services/professor-lesson.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateLessonLevelDto } from '../dtos/create-lesson-level.dto';
import { FindLessonLevelDto } from '../dtos/find-lesson-level.dto';

@Controller('lesson')
export class LessonLevelController {
  constructor(
    private readonly lessonLevelService: LessonLevelService,
    private readonly lessonService: ProfessorLessonService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/level')
  async create(@Param('id') id: number, @Body() body: CreateLessonLevelDto) {
    try {
      if (!(await this.lessonService.findById(id))) {
        throw new BadRequestException(`Lesson with ID #${id} does not exists`);
      }

      return await this.lessonLevelService.create(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/level')
  async find(@Param('id') id: number, @Query() query: FindLessonLevelDto) {
    try {
      if (!(await this.lessonService.findById(id))) {
        throw new BadRequestException(`Lesson with ID #${id} does not exists`);
      }

      return await this.lessonLevelService.find(id, query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
