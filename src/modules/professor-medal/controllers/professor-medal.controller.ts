import { Controller } from '@nestjs/common';
import { ProfessorMedalService } from '../services/professor-medal.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Professor Medal')
@Controller('professor')
export class ProfessorMedalController {
  constructor(private readonly professorMedalService: ProfessorMedalService) {}
}
