import { Controller } from '@nestjs/common';
import { LessonLevelService } from '../services/lesson-level.service';
import { ProfessorLessonService } from 'src/modules/professor-lesson/services/professor-lesson.service';

@Controller('lesson')
export class LessonLevelController {
  constructor(
    private readonly lessonLevelService: LessonLevelService,
    private readonly lessonService: ProfessorLessonService,
  ) {}
}
