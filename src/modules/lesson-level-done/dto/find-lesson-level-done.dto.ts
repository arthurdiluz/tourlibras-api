import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class FindLessonLevelDoneDto {
  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCorrectAttempt?: boolean;
}
