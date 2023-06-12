import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateDoneExerciseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  exerciseId: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsNotEmpty()
  isCorrectAttempt: boolean;
}
