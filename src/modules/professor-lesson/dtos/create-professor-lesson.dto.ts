import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProfessorLessonDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  medalId?: number;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  icon: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  title: string;
}
