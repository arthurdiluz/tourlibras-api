import { Injectable } from '@nestjs/common';
import { LessonLevelDoneRepository } from '../repositories/lesson-level-done.repository';
import { StudentLessonService } from 'src/modules/student-lesson/services/student-lesson.service';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';

@Injectable()
export class LessonLevelDoneService {
  constructor(
    private readonly lessonLevelDoneRepository: LessonLevelDoneRepository,
    private readonly studentLessonService: StudentLessonService,
    private readonly lessonLevelService: LessonLevelService,
  ) {}
}
