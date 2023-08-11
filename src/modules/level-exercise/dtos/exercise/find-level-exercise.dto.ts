import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { FindExerciseAlternative } from '../alternative/find-exercise-alternative.dto';

export class FindLevelExerciseDto extends FindExerciseAlternative {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(255)
  @IsOptional()
  media?: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(31)
  @IsOptional()
  statement?: string;
}
