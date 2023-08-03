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
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @Length(3, 31)
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @Length(8, 63)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;

  @IsString()
  @IsEnum(ROLE)
  @IsNotEmpty()
  role: ROLE;
}
