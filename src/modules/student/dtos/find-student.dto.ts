import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Theme } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max } from 'class-validator';
import { FindUserDto } from 'src/modules/user/dtos';

export class FindStudentDto extends PartialType(FindUserDto) {
  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 0,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  experience?: number;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 0.0,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  money?: number;

  @ApiPropertyOptional({
    type: String,
    enum: Theme,
    required: false,
    example: Theme.LIGHT,
  })
  @IsEnum(Theme)
  @IsOptional()
  theme?: Theme;
}
