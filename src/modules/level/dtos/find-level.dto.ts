import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { randomUUID } from 'crypto';

export class FindLevelDto {
  @ApiPropertyOptional({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  lessonId?: string;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 1,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(9)
  @IsOptional()
  level?: number;

  @ApiPropertyOptional({
    type: Number,
    required: true,
    example: 100,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  earnedXp?: number;

  @ApiPropertyOptional({
    type: Number,
    required: true,
    example: 50,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  earnedMoney?: number;
}
