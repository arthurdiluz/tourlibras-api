import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBase64,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateItemDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Óculos de sol',
  })
  @IsString()
  @IsOptional()
  @Length(3, 15)
  name?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Permite que você mude para o tema escuro.',
  })
  @IsString()
  @IsOptional()
  @Length(3, 31)
  description?: string;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 500,
  })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'blob:http://localhost:3000/01234567-89ab-cdef-0123-456789abcdef',
  })
  @IsString()
  @IsBase64()
  @Length(3, 255)
  @IsOptional()
  media?: string;
}
