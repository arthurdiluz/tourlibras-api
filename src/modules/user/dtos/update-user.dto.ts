import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
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

  @IsStrongPassword()
  @Length(8, 63)
  @IsNotEmpty()
  password?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;
}
