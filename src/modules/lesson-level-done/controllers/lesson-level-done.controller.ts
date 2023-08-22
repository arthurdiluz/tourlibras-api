import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { LessonLevelDoneService } from '../services/lesson-level-done.service';
import { StudentLessonService } from 'src/modules/student-lesson/services/student-lesson.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateLessonLevelDoneDto } from '../dto/create-lesson-level-done.dto';
import { LevelExerciseService } from 'src/modules/level-exercise/services/level-exercise.service';

@Controller('student-lesson')
export class LessonLevelDoneController {
  constructor(
    private readonly lessonLevelDoneService: LessonLevelDoneService,
    private readonly studentService: StudentLessonService,
    private readonly exerciseService: LevelExerciseService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':studentOnLessonId/lessonLevel/:lessonLevelExerciseId/done')
  async create(
    @Param('studentOnLessonId') studentId: number,
    @Param('lessonLevelExerciseId') exerciseId: number,
    @Body() body: CreateLessonLevelDoneDto,
  ) {
    return await this.lessonLevelDoneService;
  }
}
