import { Injectable } from '@nestjs/common';
import { LessonLevelRepository } from '../repositories/lesson-level.repository';
import { CreateLessonLevelDto } from '../dtos/create-lesson-level.dto';
import { FindLessonLevelDto } from '../dtos/find-lesson-level.dto';
import { UpdateLessonLevelDto } from '../dtos/update-lesson-level.dto';

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

  async find(lessonId: number, query: FindLessonLevelDto) {
    return this.lessonLevelRepository.findMany({
      where: {
        Lesson: { id: lessonId },
        ...query,
      },
      include: { Lesson: true },
    });
  }

  async findById(id: number) {
    return this.lessonLevelRepository.findUnique({
      where: { id },
      include: { Lesson: true },
    });
  }

  async update(id: number, body: UpdateLessonLevelDto) {
    return this.lessonLevelRepository.update({
      where: { id },
      data: { ...body },
      include: { Lesson: true },
    });
  }

  async delete(id: number) {
    return this.lessonLevelRepository.delete({ where: { id } });
  }
}
