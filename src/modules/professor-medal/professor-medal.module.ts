import { Module } from '@nestjs/common';
import { ProfessorMedalController } from './controllers/professor-medal.controller';
import { ProfessorMedalService } from './services/professor-medal.service';
import { ProfessorMedalRepository } from './repositories/professor-medal.repository';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [ProfessorModule],
  controllers: [ProfessorMedalController],
  providers: [ProfessorMedalService, ProfessorMedalRepository],
  exports: [ProfessorMedalService],
})
export class ProfessorMedalModule {}
