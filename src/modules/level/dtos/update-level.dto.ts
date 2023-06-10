import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max } from 'class-validator';

export class UpdateLevelDto {
  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 100,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  earnedXp: number;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 50,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  earnedMoney: number;
}
