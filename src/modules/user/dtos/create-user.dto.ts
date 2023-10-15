import { ROLE } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(31)
  @IsNotEmpty()
  fullName: string;

  @Transform(({ value }) => String(value).trim())
  @IsEmail()
  @MaxLength(31)
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => String(value).trim())
  // TODO: @IsStrongPassword()
  @MaxLength(63)
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => ROLE[String(value).toUpperCase().trim()])
  @IsEnum(ROLE)
  @IsOptional()
  role: ROLE;
}
