import { ApiProperty } from '@nestjs/swagger';
import { Theme } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateStudentDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  professorId?: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 0,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  experience?: number;

  @ApiProperty({
    type: Number,
    required: false,
    example: 0.0,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  money?: number;

  @ApiProperty({
    type: String,
    enum: Theme,
    required: false,
    example: Theme.LIGHT,
  })
  @IsString()
  @IsEnum(Theme)
  @IsOptional()
  theme?: Theme;
}
