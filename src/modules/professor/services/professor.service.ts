import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from '../repositories/professor.repository';

@Injectable()
export class ProfessorService {
  constructor(private readonly professorRepository: ProfessorRepository) {}
}
