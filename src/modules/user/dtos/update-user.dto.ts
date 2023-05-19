import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBase64,
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
  @ApiPropertyOptional({
    type: Boolean,
    required: false,
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'James Johnson',
  })
  @IsString()
  @MaxLength(31)
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'james.johnson@example.com',
  })
  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'This_Is_a_new.password123',
  })
  @IsStrongPassword()
  @Length(8, 63)
  @IsNotEmpty()
  password?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
  })
  @IsString()
  @IsBase64()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;
}
