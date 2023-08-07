import { ROLE } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} from 'class-validator';

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

  @Transform(({ value }) => ROLE[String(value).toUpperCase().trim()])
  @IsString()
  @IsOptional()
  role: ROLE;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  profilePhoto?: string;
}
