import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdateDoneExerciseDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsOptional()
  @IsUUID()
  exerciseId?: string;

  @ApiPropertyOptional({
    type: Boolean,
    required: false,
    example: false,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsOptional()
  isCorrectAttempt?: boolean;
}
