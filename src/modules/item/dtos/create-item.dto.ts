import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateItemDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  professorId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Óculos de sol',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Permite que você mude para o tema escuro.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 63)
  description: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 500,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  media: string;
}
