import { Injectable } from '@nestjs/common';
import { StudentLessonRepository } from '../repositories/student-lesson.repository';

@Injectable()
export class StudentLessonService {
  constructor(
    private readonly studentLessonRepository: StudentLessonRepository,
  ) {}
}
