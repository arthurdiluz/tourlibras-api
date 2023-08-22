import { Controller } from '@nestjs/common';
import { LessonLevelDoneService } from '../services/lesson-level-done.service';

@Controller('')
export class LessonLevelDoneController {
  constructor(
    private readonly lessonLevelDoneService: LessonLevelDoneService,
  ) {}
}
