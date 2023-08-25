import { Transform, Type } from 'class-transformer';
import {
  IsString,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { UpdateExerciseAlternativeDto } from '../alternative/update-exercise-alternative.dto';

export class UpdateLevelExerciseDto {
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

  @Type(() => UpdateExerciseAlternativeDto)
  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @IsOptional()
  Alternatives?: Array<UpdateExerciseAlternativeDto>;
}
