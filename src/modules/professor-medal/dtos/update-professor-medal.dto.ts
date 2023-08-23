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
  @MaxLength(63)
  @IsOptional()
  description: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsOptional()
  media: string;
}
