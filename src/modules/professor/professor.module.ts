import { Module } from '@nestjs/common';
import { ProfessorService } from './services/professor.service';
import { ProfessorController } from './controllers/professor.controller';
import { ProfessorRepository } from './repositories/professor.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository],
  exports: [ProfessorService, ProfessorRepository],
})
export class ProfessorModule {}
