import { Transform } from 'class-transformer';
import { IsString, MaxLength, IsOptional } from 'class-validator';

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
}
