import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LessonService } from '../services/lesson.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { MedalService } from 'src/modules/medal/services/medal.service';

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
    const { levelId, medalId, studentOnLessonId } = body;

    // TODO: add Level validation

    if (!(await this.medalService.findById(medalId))) {
      throw new NotFoundException(`Medal with ID "${medalId}" not found`);
    }

    // TODO: add StudentOnLesson validation

    return await this.lessonService.create(body);
  }
}
