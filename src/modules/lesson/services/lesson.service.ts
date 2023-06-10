import { Injectable } from '@nestjs/common';
import { LessonRepository } from '../repositories/lesson.repository';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}
}
