import { Transform } from 'class-transformer';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class UpdateExerciseAlternativeDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  alternativeId: number;

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
