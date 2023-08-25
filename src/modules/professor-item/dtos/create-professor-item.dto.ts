import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfessorItemDto {
  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => Number.parseFloat(value))
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Transform(({ value }) => String(value).trim())
  @IsString()
  @IsNotEmpty()
  media: string;
}
