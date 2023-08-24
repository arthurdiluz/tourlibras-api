import { Controller } from '@nestjs/common';
import { ProfessorItemService } from '../services/professor-item.service';

@Controller('professor')
export class ProfessorItemController {
  constructor(private readonly professorItemService: ProfessorItemService) {}
}
