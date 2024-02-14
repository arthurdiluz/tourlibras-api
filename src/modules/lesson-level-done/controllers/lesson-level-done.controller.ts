import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LessonLevelDoneService } from '../services/lesson-level-done.service';
import { StudentLessonService } from 'src/modules/student-lesson/services/student-lesson.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateLessonLevelDoneDto } from '../dto/create-lesson-level-done.dto';
import { FindLessonLevelDoneDto } from '../dto/find-lesson-level-done.dto';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';

@Controller('student-lesson')
export class LessonLevelDoneController {
  constructor(
    private readonly lessonLevelDoneService: LessonLevelDoneService,
    private readonly studentService: StudentLessonService,
    private readonly levelService: LessonLevelService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':studentOnLessonId/lesson-level/:lessonLevelId/done')
  async create(
    @Param('studentOnLessonId') studentOnLesson: number,
    @Param('lessonLevelId') lessonLevelId: number,
    @Body() body: CreateLessonLevelDoneDto,
  ) {
    if (!(await this.studentService.findById(studentOnLesson))) {
      throw new BadRequestException(
        `StudentOnLesson with ID #${studentOnLesson} does not exist`,
      );
    }

    if (!(await this.levelService.findById(lessonLevelId))) {
      throw new BadRequestException(
        `LessonLevel with ID #${lessonLevelId} does not exist`,
      );
    }

    return await this.lessonLevelDoneService.create(
      studentOnLesson,
      lessonLevelId,
      body,
    );
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':studentOnLessonId/lesson-level/:lessonLevelId/done')
  async find(
    @Param('studentOnLessonId') studentId: number,
    @Param('lessonLevelId') lessonLevelId: number,
    @Query() query: FindLessonLevelDoneDto,
  ) {
    if (!(await this.studentService.findById(studentId))) {
      throw new BadRequestException(
        `StudentOnLesson with ID #${studentId} does not exist`,
      );
    }

    if (!(await this.levelService.findById(lessonLevelId))) {
      throw new BadRequestException(
        `LessonLevelExercise with ID #${lessonLevelId} does not exist`,
      );
    }

    return await this.lessonLevelDoneService.find(
      studentId,
      lessonLevelId,
      query,
    );
  }
}
