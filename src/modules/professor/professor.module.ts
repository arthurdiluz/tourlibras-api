import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProfessorController } from './controllers/professor.controller';
import { ProfessorRepository } from './repositories/professor.repository';
import { ProfessorService } from './services/professor.service';

@Module({
  imports: [UserModule],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository],
  exports: [ProfessorService],
})
export class ProfessorModule {}
