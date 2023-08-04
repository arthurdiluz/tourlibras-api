import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
  IsObject,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateUserDto } from '../create-user.dto';
import { THEME } from '@prisma/client';

export class CreateStudentDto {
  @IsObject()
  @Type(() => CreateUserDto)
  @IsNotEmpty()
  User: CreateUserDto;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  professorId?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  experience?: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsOptional()
  money?: number;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(THEME)
  @IsOptional()
  theme?: THEME;
}
