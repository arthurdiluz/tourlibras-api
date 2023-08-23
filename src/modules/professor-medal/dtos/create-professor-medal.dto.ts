import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProfessorMedalDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(63)
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  media: string;
}
