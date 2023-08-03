import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Max, IsOptional, IsEnum } from 'class-validator';
import { FindUserDto } from 'src/modules/user/dtos/find-user.dto';
import { THEME } from '@prisma/client';

export class FindStudentDto extends PartialType(FindUserDto) {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  experience?: number;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @Max(32767)
  @IsOptional()
  money?: number;

  @IsEnum(THEME)
  @IsOptional()
  theme?: THEME;
}
