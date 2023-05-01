import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class FindUserDto {
  @ApiPropertyOptional({
    type: Boolean,
    required: false,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  isActive?: boolean;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'John Smith',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'john.smith@example.com',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  email?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'blob:xvclSFAVcaZZVC',
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  profilePhoto?: string;
}
