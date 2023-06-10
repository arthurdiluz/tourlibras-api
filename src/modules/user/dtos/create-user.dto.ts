import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
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

export class CreateUserDto {
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
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;

  @ApiProperty({
    type: String,
    enum: Role,
    required: false,
    example: Role.STUDENT,
  })
  @IsString()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
