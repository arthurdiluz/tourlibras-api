import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { THEME } from '@prisma/client';

export class UpdateStudentDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  professorId?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  experience?: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsOptional()
  money?: number;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(THEME)
  @IsOptional()
  theme?: THEME;
}
