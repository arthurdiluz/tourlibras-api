import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from '../services/student.service';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
}
