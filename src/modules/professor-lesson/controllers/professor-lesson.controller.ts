import { Controller } from '@nestjs/common';
import { ProfessorLessonService } from '../services/professor-lesson.service';

@Controller('professor')
export class ProfessorLessonController {
  constructor(
    private readonly professorLessonService: ProfessorLessonService,
  ) {}
}
