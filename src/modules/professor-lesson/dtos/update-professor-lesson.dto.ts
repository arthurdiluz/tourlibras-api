import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfessorLessonDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(255)
  @IsOptional()
  icon?: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsOptional()
  title?: string;
}
