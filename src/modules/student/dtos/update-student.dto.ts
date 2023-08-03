import {
  IsOptional,
  IsUUID,
  IsNumber,
  Max,
  IsString,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { THEME } from '@prisma/client';

export class UpdateStudentDto {
  @IsOptional()
  @IsUUID()
  professorId?: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  experience?: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  money?: number;

  @IsString()
  @IsEnum(THEME)
  @IsOptional()
  theme?: THEME;
}
