import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindLessonLevelDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  level?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  earnedXp?: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsOptional()
  earnedMoney?: number;
}
