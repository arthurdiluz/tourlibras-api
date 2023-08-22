import { Injectable } from '@nestjs/common';
import { LessonLevelDoneRepository } from '../repositories/lesson-level-done.repository';
import { StudentLessonService } from 'src/modules/student-lesson/services/student-lesson.service';
import { LevelExerciseService } from 'src/modules/level-exercise/services/level-exercise.service';

@Injectable()
export class LessonLevelDoneService {
  constructor(
    private readonly lessonLevelDoneRepository: LessonLevelDoneRepository,
    private readonly lessonService: StudentLessonService,
    private readonly exerciseService: LevelExerciseService,
  ) {}
}
