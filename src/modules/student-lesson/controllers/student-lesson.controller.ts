import { Controller } from '@nestjs/common';
import { StudentLessonService } from '../services/student-lesson.service';

@Controller('student')
export class StudentLessonController {
  constructor(private readonly studentLessonService: StudentLessonService) {}
}
