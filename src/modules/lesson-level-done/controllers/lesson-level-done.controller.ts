import { Controller } from '@nestjs/common';
import { LessonLevelDoneService } from '../services/lesson-level-done.service';
import { StudentLessonService } from 'src/modules/student-lesson/services/student-lesson.service';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';

@Controller('student-lesson')
export class LessonLevelDoneController {
  constructor(
    private readonly lessonLevelDoneService: LessonLevelDoneService,
    private readonly studentLessonService: StudentLessonService,
    private readonly lessonLevelService: LessonLevelService,
  ) {}
}
