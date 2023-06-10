import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class FindMedalDto {
  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'Alfabetizado',
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  name?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'Finalizou a aula de Alfabeto',
  })
  @IsOptional()
  @IsString()
  @MaxLength(63)
  description?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  media?: string;

  @ApiPropertyOptional({
    type: Boolean,
    required: true,
    example: true,
  })
  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCumultative?: boolean;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  professorId?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  lessonId?: string;
}
