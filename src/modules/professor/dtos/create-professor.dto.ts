import { ApiProperty } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateProfessorDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: Grammar.OSV,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: Grammar;
}
