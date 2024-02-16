import { Module } from '@nestjs/common';
import { AwsModule } from 'src/common/aws/aws.module';
import { ProfessorMedalController } from './controllers/professor-medal.controller';
import { ProfessorMedalService } from './services/professor-medal.service';
import { ProfessorMedalRepository } from './repositories/professor-medal.repository';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [ProfessorModule, AwsModule],
  controllers: [ProfessorMedalController],
  providers: [ProfessorMedalService, ProfessorMedalRepository],
  exports: [ProfessorMedalService],
})
export class ProfessorMedalModule {}
