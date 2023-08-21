import { Injectable } from '@nestjs/common';
import { StudentLessonRepository } from '../repositories/student-lesson.repository';
import { CreateStudentLessonDto } from '../dtos/create-student-lesson.dto';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';

@Injectable()
export class StudentLessonService {
  constructor(
    private readonly studentLessonRepository: StudentLessonRepository,
    private readonly lessonLevel: LessonLevelService,
  ) {}

  async create(
    studentId: number,
    lessonId: number,
    body: CreateStudentLessonDto,
  ) {
    return await this.studentLessonRepository.create({
      data: {
        Student: { connect: { id: studentId } },
        Lesson: { connect: { id: lessonId } },
        ...body,
      },
    });
  }
}
