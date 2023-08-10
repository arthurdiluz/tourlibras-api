import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateExerciseAlternative {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  text: string;

  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
