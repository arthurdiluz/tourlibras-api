import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  Matches,
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
    example: 'john.smith',
  })
  @IsOptional()
  @Matches(/^[a-z0-9_.-]+$/)
  @IsString()
  @MaxLength(15)
  username?: string;

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
