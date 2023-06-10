import { Module } from '@nestjs/common';
import { MedalService } from './services/medal.service';
import { MedalController } from './controllers/medal.controller';
import { MedalRepository } from './repositories/medal.repository';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [ProfessorModule],
  controllers: [MedalController],
  providers: [MedalService, MedalRepository],
  exports: [MedalService, MedalRepository],
})
export class MedalModule {}
