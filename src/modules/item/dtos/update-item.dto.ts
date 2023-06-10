import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

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
  @Length(3, 63)
  description?: string;

  @ApiPropertyOptional({
    type: Number,
    required: false,
    example: 500,
  })
  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @Length(3, 255)
  @IsOptional()
  media?: string;
}
