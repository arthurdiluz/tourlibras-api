import { Module, forwardRef } from '@nestjs/common';
import { LessonService } from './services/lesson.service';
import { LessonController } from './controllers/lesson.controller';
import { LessonRepository } from './repositories/lesson.repository';
import { MedalModule } from '../medal/medal.module';

@Module({
  imports: [forwardRef(() => MedalModule)],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  exports: [LessonService, LessonRepository],
})
export class LessonModule {}
