import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateMedalDto {
  @ApiProperty({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Alfabetizado',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 15)
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Finalizou a aula de Alfabeto',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 63)
  description: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  media: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    example: true,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(eval(value)))
  @IsNotEmpty()
  isCumultative: boolean;
}
