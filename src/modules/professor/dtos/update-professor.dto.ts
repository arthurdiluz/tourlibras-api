import { IsEnum, IsOptional } from 'class-validator';
import { GRAMMAR } from '@prisma/client';

export class UpdateProfessorDto {
  @IsEnum(GRAMMAR)
  @IsOptional()
  grammar?: GRAMMAR;
}
