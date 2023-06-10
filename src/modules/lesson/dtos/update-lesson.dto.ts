import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdateLessonDto {
  @ApiPropertyOptional({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  medalId?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  levelId?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsOptional()
  studentOnLessonId?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'Alfabeto',
  })
  @IsString()
  @Length(3, 15)
  @IsOptional()
  title?: string;
}
