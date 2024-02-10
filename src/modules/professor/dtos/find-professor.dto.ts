import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { FindUserDto } from 'src/modules/user/dtos/find-user.dto';
import { GRAMMAR } from '@prisma/client';

export class FindProfessorDto extends FindUserDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  search?: string;

  @Transform(({ value }) => String(value).toUpperCase())
  @IsEnum(GRAMMAR)
  @IsOptional()
  grammar?: GRAMMAR;

  @IsString()
  @IsOptional()
  sortBy?: 'Students' | 'Lessons';
}
