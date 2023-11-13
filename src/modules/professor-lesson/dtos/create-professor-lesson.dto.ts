import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProfessorLessonDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  title: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(255)
  @IsOptional()
  icon?: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  medalId?: number;
}
