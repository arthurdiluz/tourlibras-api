import { Module } from '@nestjs/common';
import { ProfessorService } from './services/professor.service';
import { ProfessorController } from './controllers/professor.controller';
import { ProfessorRepository } from './repositories/professor.repository';

@Module({
  imports: [],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository],
  exports: [ProfessorService, ProfessorRepository],
})
export class ProfessorModule {}