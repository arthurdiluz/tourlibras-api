import { Injectable } from '@nestjs/common';
import { ProfessorMedalRepository } from '../repositories/professor-medal.repository';
import { ProfessorService } from 'src/modules/professor/services/professor.service';

@Injectable()
export class ProfessorMedalService {
  constructor(
    private readonly professorMedalRepository: ProfessorMedalRepository,
    private readonly professorService: ProfessorService,
  ) {}
}
