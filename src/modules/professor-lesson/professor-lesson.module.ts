import { Module } from '@nestjs/common';
import { ProfessorLessonService } from './services/professor-lesson.service';
import { ProfessorLessonController } from './controllers/professor-lesson.controller';
import { ProfessorLessonRepository } from './repositories/professor-lesson.repository';
import { ProfessorModule } from '../professor/professor.module';
import { ProfessorMedalModule } from '../professor-medal/professor-medal.module';
import { AwsModule } from 'src/common/aws/aws.module';

@Module({
  imports: [ProfessorModule, ProfessorMedalModule, AwsModule],
  controllers: [ProfessorLessonController],
  providers: [ProfessorLessonService, ProfessorLessonRepository],
  exports: [ProfessorLessonService],
})
export class ProfessorLessonModule {}
