import { ApiPropertyOptional } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class FindProfessorDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: string;
}
