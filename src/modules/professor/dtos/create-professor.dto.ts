import { IsUUID, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { GRAMMAR } from '@prisma/client';

export class CreateProfessorDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(GRAMMAR)
  @IsOptional()
  grammar?: GRAMMAR;
}
