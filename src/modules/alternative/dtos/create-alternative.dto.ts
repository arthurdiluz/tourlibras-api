import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateAlternativeDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  exerciseId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Eu gosto de cinema',
  })
  @IsString()
  @Length(3, 15)
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    example: false,
  })
  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
