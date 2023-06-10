import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import { randomUUID } from 'crypto';

export class FindLessonDto {
  @ApiPropertyOptional({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  medalId?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  levelId?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  icon?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'Alfabeto',
  })
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  title?: string;
}
