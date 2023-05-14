import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfessorService } from '../services/professor.service';

@ApiTags('Professor')
@Controller('api/v1/professor')
export class ProfessorController {
  constructor(private readonly professorService: ProfessorService) {}
}
