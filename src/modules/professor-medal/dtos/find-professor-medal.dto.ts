import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class FindProfessorMedalDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  professorId: number;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsOptional()
  name?: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(127)
  @IsOptional()
  description?: string;
}
