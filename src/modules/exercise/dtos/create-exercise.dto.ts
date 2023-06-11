import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateExerciseDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'data:image/png;base64,R0lGODlhDAAMAKIFAF5LA\
    P/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAA\
    MlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7'.replace(/\s/g, ''),
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  media: string;

  @ApiProperty({})
  @IsString()
  @Length(3, 31)
  @IsNotEmpty()
  statement: string;
}
