import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfessorMedalDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsOptional()
  name: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(127)
  @IsOptional()
  description: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(255)
  @IsOptional()
  media: string;
}
