import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBase64,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class FindUserDto {
  @ApiPropertyOptional({
    type: Boolean,
    required: false,
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'John Smith',
  })
  @IsString()
  @MaxLength(31)
  @IsOptional()
  fullName?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'john.smith@example.com',
  })
  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'data:image/png;base64,iVBORw0KGg...',
  })
  @IsString()
  @IsBase64()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;
}
