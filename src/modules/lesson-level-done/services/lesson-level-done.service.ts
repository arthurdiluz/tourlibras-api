import { Injectable } from '@nestjs/common';
import { LessonLevelDoneRepository } from '../repositories/lesson-level-done.repository';

@Injectable()
export class LessonLevelDoneService {
  constructor(
    private readonly lessonLevelDoneRepository: LessonLevelDoneRepository,
  ) {}
}
