import { Module } from '@nestjs/common';
import { ProfessorMedalService } from './services/professor-medal.service';
import { ProfessorMedalController } from './controllers/professor-medal.controller';
import { ProfessorModule } from '../professor/professor.module';
import { ProfessorMedalRepository } from './repositories/professor-medal.repository';

@Module({
  imports: [ProfessorModule],
  controllers: [ProfessorMedalController],
  providers: [ProfessorMedalService, ProfessorMedalRepository],
  exports: [ProfessorMedalService],
})
export class ProfessorMedalModule {}
