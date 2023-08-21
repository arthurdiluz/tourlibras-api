import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentLessonService } from '../services/student-lesson.service';
import { StudentService } from 'src/modules/student/services/student.service';
import { ProfessorLessonService } from 'src/modules/professor-lesson/services/professor-lesson.service';
import { CreateStudentLessonDto } from '../dtos/create-student-lesson.dto';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { FindStudentLessonDto } from '../dtos/find-student-lesson.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('student')
export class StudentLessonController {
  constructor(
    private readonly studentLessonService: StudentLessonService,
    private readonly studentService: StudentService,
    private readonly lessonService: ProfessorLessonService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/lesson/:lessonId')
  async create(
    @Param('id') studentId: number,
    @Param('lessonId') lessonId: number,
    @Body() body: CreateStudentLessonDto,
  ) {
    try {
      if (!(await this.studentService.findById(studentId))) {
        throw new BadRequestException(
          `Student with ID #${studentId} does not exists`,
        );
      }

      if (!(await this.lessonService.findById(lessonId))) {
        throw new BadRequestException(
          `Lesson with ID #${lessonId} does not exists`,
        );
      }

      return await this.studentLessonService.create(studentId, lessonId, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/lesson/:lessonId')
  async find(
    @Param('id') studentId: number,
    @Param('lessonId') lessonId: number,
    @Query() query: FindStudentLessonDto,
  ) {
    try {
      if (!(await this.studentService.findById(studentId))) {
        throw new BadRequestException(
          `Student with ID #${studentId} does not exists`,
        );
      }

      if (!(await this.lessonService.findById(lessonId))) {
        throw new BadRequestException(
          `Lesson with ID #${lessonId} does not exists`,
        );
      }

      return await this.studentLessonService.find(studentId, lessonId, query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':studentId/lesson/:lessonId/:id')
  async findById(
    @Param('studentId') studentId: number,
    @Param('lessonId') lessonId: number,
    @Param('id') id: number,
  ) {
    try {
      if (!(await this.studentService.findById(studentId))) {
        throw new BadRequestException(
          `Student with ID #${studentId} does not exists`,
        );
      }

      if (!(await this.lessonService.findById(lessonId))) {
        throw new BadRequestException(
          `Lesson with ID #${lessonId} does not exists`,
        );
      }

      const studentOnLesson = await this.studentLessonService.findById(id);

      if (!studentOnLesson) {
        throw new NotFoundException(`StudentOnLesson with ID #${id} not found`);
      }

      return studentOnLesson;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
