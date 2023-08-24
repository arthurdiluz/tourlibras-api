import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfessorItemDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  name?: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsOptional()
  price?: number;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsOptional()
  media?: string;
}
