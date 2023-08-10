import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateExerciseAlternative } from '../alternative/create-exercise-alternative.dto';

export class CreateLevelExerciseDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  media: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(31)
  @IsNotEmpty()
  statement: string;

  @Type(() => CreateExerciseAlternative)
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @IsNotEmpty()
  Alternatives: Array<CreateExerciseAlternative>;
}
