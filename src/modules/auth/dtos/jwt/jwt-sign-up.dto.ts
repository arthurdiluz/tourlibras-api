import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
import { ROLE } from '@prisma/client';

export class JwtSignUpDto {
  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @Length(3, 31)
  @IsNotEmpty()
  fullName: string;

  @Transform(({ value }) => String(value).toLowerCase())
  @IsEmail()
  @MaxLength(31)
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => String(value).toLowerCase())
  @IsStrongPassword()
  @Length(8, 63)
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => String(value).toLowerCase())
  @IsString()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;

  @IsString()
  @IsEnum(ROLE)
  @IsNotEmpty()
  role: ROLE;
}
