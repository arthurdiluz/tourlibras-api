import { ApiProperty } from '@nestjs/swagger';
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

export class JwtSignUpDto {
  @ApiProperty({
    type: Boolean,
    required: true,
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsNotEmpty()
  isProfessor: boolean;

  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    type: String,
    required: true,
    example: 'John Smith',
  })
  @IsString()
  @Length(3, 31)
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john.smith@example.com',
  })
  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'u*X^MWuR%&R3Sf%HsNv9#2N$23#%2X!msc2S&9KzK%#!H42C5n7qe&^88Rv6d7*',
  })
  @IsStrongPassword()
  @Length(8, 63)
  @IsNotEmpty()
  password: string;

  @ApiProperty({
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
