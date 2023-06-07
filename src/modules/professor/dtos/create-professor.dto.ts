import { ApiProperty } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateProfessorDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: String,
    enum: Grammar,
    required: false,
    example: Grammar.OSV,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: Grammar;
}
