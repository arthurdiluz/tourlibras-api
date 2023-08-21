import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentLessonDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  currentLevel: number;

  @Transform(({ value }) => Boolean(eval(value)))
  @IsBoolean()
  @IsNotEmpty()
  isCompleted: boolean;

  // @IsArray()
  // @Type(() => Boolean)
  // @IsBoolean({ each: true })
  // @IsNotEmpty()
  // answers: Array<boolean>;
}
