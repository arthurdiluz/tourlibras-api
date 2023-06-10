import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LessonService } from '../services/lesson.service';

@ApiTags('Lesson')
@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}
}
