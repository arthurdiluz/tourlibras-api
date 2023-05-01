import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: Boolean,
    required: true,
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean = false;

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
  @IsString()
  @IsNotEmpty()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'u*X^MWuR%&R3Sf%HsNv9#2N$23#%2X!msc2S&9KzK%#!H42C5n7qe&^88Rv6d7*',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  @Length(8, 63)
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'blob:xvclSFAVcaZZVC',
  })
  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  profilePhoto: string;
}
