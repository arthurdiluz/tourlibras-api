import { Transform } from 'class-transformer';
import { CreateUserDto } from '../create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ROLE, GRAMMAR } from '@prisma/client';

export class CreateProfessorDto extends CreateUserDto {
  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(GRAMMAR)
  @IsOptional()
  grammar?: GRAMMAR;

  role: ROLE = 'PROFESSOR';
}
