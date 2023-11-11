import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class FindProfessorLessonDto {
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

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  medalId?: number;
}
