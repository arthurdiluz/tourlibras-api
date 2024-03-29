import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsEnum, IsString } from 'class-validator';
import { FindUserDto } from 'src/modules/user/dtos/find-user.dto';
import { THEME } from '@prisma/client';

export class FindStudentDto extends FindUserDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sortBy?: 'Experience' | 'Money';

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

  @Transform(({ value }) => THEME[String(value).toUpperCase().trim()])
  @IsEnum(THEME)
  @IsOptional()
  theme?: THEME;
}
