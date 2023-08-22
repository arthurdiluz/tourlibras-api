import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class CreateLessonLevelDoneDto {
  @Type(() => Boolean)
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  Answers: Array<boolean>;
}
