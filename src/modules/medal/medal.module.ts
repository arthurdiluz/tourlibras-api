import { Module, forwardRef } from '@nestjs/common';
import { MedalService } from './services/medal.service';
import { MedalController } from './controllers/medal.controller';
import { MedalRepository } from './repositories/medal.repository';
import { ProfessorModule } from '../professor/professor.module';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [forwardRef(() => LessonModule), ProfessorModule],
  controllers: [MedalController],
  providers: [MedalService, MedalRepository],
  exports: [MedalService, MedalRepository],
})
export class MedalModule {}
