import { Injectable } from '@nestjs/common';
import { ProfessorLessonRepository } from '../repositories/professor-lesson.repository';

@Injectable()
export class ProfessorLessonService {
  constructor(
    private readonly professorLessonRepository: ProfessorLessonRepository,
  ) {}
}
