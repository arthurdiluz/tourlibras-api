import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LevelService } from '../services/level.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateLevelDto } from '../dtos/create-level.dto';
import { LessonService } from 'src/modules/lesson/services/lesson.service';
import { FindLevelDto } from '../dtos/find-level.dto';

@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(
    private readonly levelService: LevelService,
    private readonly lessonService: LessonService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async create(@Body() { lessonId, ...body }: CreateLevelDto) {
    try {
      if (!(await this.lessonService.findById(lessonId))) {
        throw new NotFoundException(`Lesson with ID "${lessonId}" not found`);
      }

      return await this.levelService.create({ lessonId, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() { lessonId, ...query }: FindLevelDto) {
    try {
      if (!(await this.lessonService.findById(lessonId))) {
        throw new NotFoundException(`Lesson with ID "${lessonId}" not found`);
      }

      return await this.levelService.find({ lessonId, ...query });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
