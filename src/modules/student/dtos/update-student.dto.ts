import { ApiPropertyOptional } from '@nestjs/swagger';
import { Theme } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdateStudentDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsOptional()
  @IsUUID()
  professorId?: string;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 0,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  experience?: number;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 0.0,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsOptional()
  money?: number;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: Theme.LIGHT,
  })
  @IsString()
  @IsEnum(Theme)
  @IsOptional()
  theme?: Theme;
}
