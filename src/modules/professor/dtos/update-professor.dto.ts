import { ApiPropertyOptional } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdateProfessorDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: Grammar.VSO,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: string;
}
