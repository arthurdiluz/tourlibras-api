import { ApiProperty } from '@nestjs/swagger';
import {
  IsBase64,
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
  @Length(3, 31)
  description: string;

  @ApiProperty({
    type: Number,
    required: true,
    example: 500,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
  })
  @IsString()
  @IsBase64()
  @MaxLength(255)
  @IsOptional()
  media: string;
}
