import { Injectable } from '@nestjs/common';
import { LessonRepository } from '../repositories/lesson.repository';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { FindLessonDto } from '../dtos/find-lesson.dto';

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
}
