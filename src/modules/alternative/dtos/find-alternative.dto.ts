import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class FindAlternativeDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  exerciseId?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Eu gosto de cinema',
  })
  @IsString()
  @MaxLength(15)
  @IsOptional()
  text?: string;

  @ApiPropertyOptional({
    type: Boolean,
    required: false,
    example: false,
  })
  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
