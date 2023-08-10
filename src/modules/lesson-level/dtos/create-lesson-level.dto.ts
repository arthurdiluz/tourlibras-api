import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateLessonLevelDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  level?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  earnedXp: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  earnedMoney: number;
}
