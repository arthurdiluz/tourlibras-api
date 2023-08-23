import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonLevelService } from '../services/lesson-level.service';
import { ProfessorLessonService } from 'src/modules/professor-lesson/services/professor-lesson.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateLessonLevelDto } from '../dtos/create-lesson-level.dto';
import { FindLessonLevelDto } from '../dtos/find-lesson-level.dto';
import { UpdateLessonLevelDto } from '../dtos/update-lesson-level.dto';
import { ProfessorMedalService } from 'src/modules/professor-medal/services/professor-medal.service';

@Controller('lesson')
export class LessonLevelController {
  constructor(
    private readonly lessonLevelService: LessonLevelService,
    private readonly lessonService: ProfessorLessonService,
    private readonly medalService: ProfessorMedalService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/level')
  async create(@Param('id') id: number, @Body() body: CreateLessonLevelDto) {
    try {
      const { medalId } = body;

      if (!(await this.lessonService.findById(id))) {
        throw new BadRequestException(`Lesson with ID #${id} does not exists`);
      }

      if (medalId) {
        if (!(await this.medalService.findById(medalId))) {
          throw new BadRequestException(
            `Medal with ID #${medalId} does not exists`,
          );
        }
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

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/level/:levelId')
  async findById(@Param('id') id: number, @Param('levelId') levelId: number) {
    try {
      if (!(await this.lessonService.findById(id))) {
        throw new BadRequestException(`Lesson with ID #${id} does not exists`);
      }

      const level = await this.lessonLevelService.findById(levelId);

      if (!level) {
        throw new NotFoundException(`Level with ID #${level} not found`);
      }

      return level;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id/level/:levelId')
  async update(
    @Param('id') id: number,
    @Param('levelId') levelId: number,
    @Body() body: UpdateLessonLevelDto,
  ) {
    try {
      const { medalId } = body;

      if (!(await this.lessonService.findById(id))) {
        throw new BadRequestException(`Lesson with ID #${id} does not exists`);
      }

      if (!(await this.lessonLevelService.findById(levelId))) {
        throw new BadRequestException(`Level with ID #${id} does not exists`);
      }

      if (medalId) {
        if (!(await this.medalService.findById(medalId))) {
          throw new BadRequestException(
            `Medal with ID #${medalId} does not exists`,
          );
        }
      }

      return await this.lessonLevelService.update(levelId, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id/level/:levelId')
  async delete(@Param('id') id: number, @Param('levelId') levelId: number) {
    try {
      if (!(await this.lessonService.findById(id))) {
        throw new BadRequestException(`Lesson with ID #${id} does not exists`);
      }

      if (!(await this.lessonLevelService.findById(levelId))) {
        throw new BadRequestException(`Level with ID #${id} does not exists`);
      }

      return await this.lessonLevelService.delete(levelId);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
