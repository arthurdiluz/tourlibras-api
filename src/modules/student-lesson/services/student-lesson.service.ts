import { Injectable } from '@nestjs/common';
import { StudentLessonRepository } from '../repositories/student-lesson.repository';
import { CreateStudentLessonDto } from '../dtos/create-student-lesson.dto';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';
import { FindStudentLessonDto } from '../dtos/find-student-lesson.dto';

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
      include: { Student: true, Lesson: true, LessonLevelDone: true },
    });
  }

  async find(studentId: number, lessonId: number, query: FindStudentLessonDto) {
    return this.studentLessonRepository.findMany({
      where: {
        Student: { id: studentId },
        Lesson: { id: lessonId },
        ...query,
      },
      include: { Student: true, Lesson: true, LessonLevelDone: true },
    });
  }

  async findById(id: number) {
    return this.studentLessonRepository.findUnique({
      where: { id },
      include: { Student: true, Lesson: true, LessonLevelDone: true },
    });
  }
}
