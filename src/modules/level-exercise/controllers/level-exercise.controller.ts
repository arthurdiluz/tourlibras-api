import { Controller } from '@nestjs/common';
import { LevelExerciseService } from '../services/level-exercise.service';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';

@Controller('exercise')
export class LevelExerciseController {
  constructor(
    private readonly levelExerciseService: LevelExerciseService,
    private readonly LevelService: LessonLevelService,
  ) {}
}
