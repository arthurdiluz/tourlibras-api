import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class FindStudentLessonDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  currentLevel?: number;

  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
