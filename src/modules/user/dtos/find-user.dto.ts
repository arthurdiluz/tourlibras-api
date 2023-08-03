import { ROLE } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class FindUserDto {
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @MaxLength(31)
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsOptional()
  email?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;

  @IsString()
  @IsEnum(ROLE)
  @IsOptional()
  role?: ROLE;
}
