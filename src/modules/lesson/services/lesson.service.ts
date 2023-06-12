import { Injectable } from '@nestjs/common';
import { LessonRepository } from '../repositories/lesson.repository';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { FindLessonDto } from '../dtos/find-lesson.dto';
import { UpdateLessonDto } from '../dtos/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async create({
    levelId,
    medalId,
    studentOnLessonId,
    ...body
  }: CreateLessonDto) {
    return this.lessonRepository.create({
      data: {
        Level: { connect: { id: levelId } },
        Medal: { connect: { id: medalId } },
        StudentOnLesson: { connect: { id: studentOnLessonId } },
        ...body,
      },
    });
  }

  async find({ title, ...query }: FindLessonDto) {
    return this.lessonRepository.findMany({
      where: {
        title: { contains: title, mode: 'insensitive' },
        ...query,
      },
    });
  }

  async findById(lessonId: string) {
    return this.lessonRepository.findUnique({ where: { id: lessonId } });
  }

  async update(
    lessonId: string,
    { levelId, medalId, studentOnLessonId, ...body }: UpdateLessonDto,
  ) {
    return this.lessonRepository.update({
      where: { id: lessonId },
      data: {
        Level: levelId ? { connect: { id: levelId } } : undefined,
        Medal: medalId ? { connect: { id: medalId } } : undefined,
        StudentOnLesson: studentOnLessonId
          ? { connect: { id: studentOnLessonId } }
          : undefined,
        ...body,
      },
    });
  }

  async delete(lessonId: string) {
    return this.lessonRepository.delete({ where: { id: lessonId } });
  }
}
