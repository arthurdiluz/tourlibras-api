import { Transform } from 'class-transformer';
import {
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ROLE } from '@prisma/client';

export class CreateUserDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @Length(3, 31)
  @IsNotEmpty()
  fullName: string;

  @Transform(({ value }) => String(value).trim())
  @IsEmail()
  @Length(3, 31)
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => String(value).trim())
  // @IsStrongPassword()
  @Length(8, 63)
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  profilePhoto?: string;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(ROLE)
  @IsOptional()
  role?: ROLE;
}
