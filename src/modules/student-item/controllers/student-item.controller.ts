import { Controller } from '@nestjs/common';
import { StudentItemService } from '../services/student-item.service';

@Controller('student')
export class StudentItemController {
  constructor(private readonly studentItemService: StudentItemService) {}
}
