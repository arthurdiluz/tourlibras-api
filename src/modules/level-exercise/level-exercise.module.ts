import { Module } from '@nestjs/common';
import { LevelExerciseController } from './controllers/level-exercise.controller';
import { LevelExerciseService } from './services/level-exercise.service';
import { LevelExerciseRepository } from './repositories/level-exercise.repository';
import { LessonLevelModule } from '../lesson-level/lesson-level.module';
import { ProfessorLessonModule } from '../professor-lesson/professor-lesson.module';
import { AwsModule } from '../../common/aws/aws.module';

@Module({
  imports: [LessonLevelModule, ProfessorLessonModule, AwsModule],
  controllers: [LevelExerciseController],
  providers: [LevelExerciseService, LevelExerciseRepository],
  exports: [LevelExerciseService],
})
export class LevelExerciseModule {}
