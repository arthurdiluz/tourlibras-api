import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class FindExerciseAlternative {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsOptional()
  text?: string;

  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
