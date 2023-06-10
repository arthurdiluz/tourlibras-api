import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {

  IsBoolean,
  IsEmail,
  IsEnum,
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
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  profilePhoto?: string;

  @ApiPropertyOptional({
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
