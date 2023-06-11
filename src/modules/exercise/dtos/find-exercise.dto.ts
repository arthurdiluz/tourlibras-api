import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class FindExerciseDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  media?: string;

  @ApiPropertyOptional({
    type: String,
    required: false,
    example: 'Selecione a alternativa correta',
  })
  @IsString()
  @MaxLength(31)
  @IsOptional()
  statement?: string;
}
