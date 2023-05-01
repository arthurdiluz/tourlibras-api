import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
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
    example: 'john.smith',
  })
  @Matches(/^[a-z0-9_.]+$/)
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  username: string;

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
