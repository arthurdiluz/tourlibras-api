import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

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

  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCumultative?: boolean;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  media: string;
}
