import { Injectable } from '@nestjs/common';
import { LessonLevelRepository } from '../repositories/lesson-level.repository';
import { CreateLessonLevelDto } from '../dtos/create-lesson-level.dto';

@Injectable()
export class LessonLevelService {
  constructor(private readonly lessonLevelRepository: LessonLevelRepository) {}

  async create(lessonId: number, body: CreateLessonLevelDto) {
    return this.lessonLevelRepository.create({
      data: {
        Lesson: { connect: { id: lessonId } },
        ...body,
      },
      include: { Lesson: true },
    });
  }
}
