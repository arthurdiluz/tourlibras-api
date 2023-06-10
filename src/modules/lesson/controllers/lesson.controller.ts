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
import { LessonService } from '../services/lesson.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { MedalService } from 'src/modules/medal/services/medal.service';
import { FindLessonDto } from '../dtos/find-lesson.dto';

@ApiTags('Lesson')
@Controller('api/v1/lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly medalService: MedalService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async create(@Body() body: CreateLessonDto) {
    try {
      const { levelId, medalId, studentOnLessonId } = body;

      // TODO: add Level validation

      if (!(await this.medalService.findById(medalId))) {
        throw new NotFoundException(`Medal with ID "${medalId}" not found`);
      }

      // TODO: add StudentOnLesson validation

      return await this.lessonService.create(body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindLessonDto) {
    try {
      return await this.lessonService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
