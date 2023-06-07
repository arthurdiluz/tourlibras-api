import { ApiPropertyOptional } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateProfessorDto {
  @ApiPropertyOptional({
    type: String,
    enum: Grammar,
    required: false,
    example: Grammar.VSO,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: Grammar;
}
