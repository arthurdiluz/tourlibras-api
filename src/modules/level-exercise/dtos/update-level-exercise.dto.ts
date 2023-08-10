import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelExerciseDto } from './create-level-exercise.dto';

export class UpdateLevelExerciseDto extends PartialType(CreateLevelExerciseDto) {}
