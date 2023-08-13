import { Transform } from 'class-transformer';
import { IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator';

export class UpdateExerciseAlternativeDto {
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
