import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Max } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateLevelDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 1,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(9)
  @IsOptional()
  level?: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 100,
  })
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(32767)
  @IsNotEmpty()
  earnedXp: number;

  @ApiProperty({
    type: Number,
    required: true,
    example: 50,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @Max(32767)
  @IsNotEmpty()
  earnedMoney: number;
}
