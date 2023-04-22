import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: Boolean,
    required: true,
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({
    type: String,
    required: true,
    example: 'John Smith',
  })
  @IsAlpha('pt-BR')
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john.smith',
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(3, 15)
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'secure-password',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  @Max(64)
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
