import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBase64,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class FindItemDto {
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
    example: 'Óculos de sol',
  })
  @IsString()
  @IsOptional()
  @MaxLength(15)
  name?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Permite que você mude para o tema escuro.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(31)
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
  @MaxLength(255)
  @IsOptional()
  media?: string;
}
