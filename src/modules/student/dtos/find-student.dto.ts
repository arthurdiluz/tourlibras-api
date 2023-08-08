import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsEnum } from 'class-validator';
import { FindUserDto } from 'src/modules/user/dtos/find-user.dto';
import { THEME } from '@prisma/client';

export class FindStudentDto extends FindUserDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  professorId?: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  experience?: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsOptional()
  money?: number;

  @IsEnum(THEME)
  @IsOptional()
  theme?: THEME;
}
