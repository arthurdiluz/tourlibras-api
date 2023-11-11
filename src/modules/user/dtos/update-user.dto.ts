import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
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
  @MaxLength(63)
  @IsOptional()
  password?: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  profilePhoto?: string;
}
