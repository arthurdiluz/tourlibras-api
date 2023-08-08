import { Controller } from '@nestjs/common';
import { ProfessorMedalService } from '../services/professor-medal.service';

@Controller('professor')
export class ProfessorMedalController {
  constructor(private readonly professorMedalService: ProfessorMedalService) {}
}
