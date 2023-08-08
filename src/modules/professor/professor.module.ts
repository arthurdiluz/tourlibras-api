import { Module, forwardRef } from '@nestjs/common';
import { ProfessorController } from './controllers/professor.controller';
import { ProfessorRepository } from './repositories/professor.repository';
import { ProfessorService } from './services/professor.service';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [forwardRef(() => StudentModule)],
  controllers: [ProfessorController],
  providers: [ProfessorService, ProfessorRepository],
  exports: [ProfessorService, ProfessorRepository],
})
export class ProfessorModule {}
