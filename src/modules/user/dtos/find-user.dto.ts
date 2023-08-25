import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ROLE } from '@prisma/client';

export class FindUserDto {
  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @MaxLength(31)
  @IsOptional()
  fullName?: string;

  @Transform(({ value }) => String(value).trim())
  @IsEmail()
  @MaxLength(31)
  @IsOptional()
  email?: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  profilePhoto?: string;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(ROLE)
  @IsOptional()
  role?: ROLE;
}
