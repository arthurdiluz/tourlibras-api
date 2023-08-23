import { Injectable } from '@nestjs/common';
import { LessonLevelRepository } from '../repositories/lesson-level.repository';
import { CreateLessonLevelDto } from '../dtos/create-lesson-level.dto';
import { FindLessonLevelDto } from '../dtos/find-lesson-level.dto';
import { UpdateLessonLevelDto } from '../dtos/update-lesson-level.dto';

@Injectable()
export class LessonLevelService {
  constructor(private readonly lessonLevelRepository: LessonLevelRepository) {}

  async create(lessonId: number, { medalId, ...body }: CreateLessonLevelDto) {
    return this.lessonLevelRepository.create({
      data: {
        Lesson: { connect: { id: lessonId } },
        Medal: medalId ? { connect: { id: medalId } } : undefined,
        ...body,
      },
      include: { Lesson: true, Medal: true },
    });
  }

  async find(lessonId: number, { medalId, ...query }: FindLessonLevelDto) {
    return this.lessonLevelRepository.findMany({
      where: {
        Lesson: { id: lessonId },
        Medal: medalId ? { id: medalId } : undefined,
        ...query,
      },
      include: { Lesson: true, Medal: true },
    });
  }

  async findById(id: number) {
    return this.lessonLevelRepository.findUnique({
      where: { id },
      include: { Lesson: true, Medal: true },
    });
  }

  async update(id: number, { medalId, ...body }: UpdateLessonLevelDto) {
    return this.lessonLevelRepository.update({
      where: { id },
      data: {
        Medal: medalId ? { update: { id: medalId } } : undefined,
        ...body,
      },
      include: { Lesson: true, Medal: true },
    });
  }

  async delete(id: number) {
    return this.lessonLevelRepository.delete({
      where: { id },
      include: { Lesson: true, Medal: true },
    });
  }
}
