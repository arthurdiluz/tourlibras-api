import { IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { GRAMMAR } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateProfessorDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(GRAMMAR)
  @IsOptional()
  grammar?: GRAMMAR;
}
