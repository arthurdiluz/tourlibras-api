import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { CreateUserDto } from '../create-user.dto';
import { GRAMMAR } from '@prisma/client';

export class CreateProfessorDto {
  @IsObject()
  @Type(() => CreateUserDto)
  @IsNotEmpty()
  User: CreateUserDto;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(GRAMMAR)
  @IsOptional()
  grammar?: GRAMMAR;
}
