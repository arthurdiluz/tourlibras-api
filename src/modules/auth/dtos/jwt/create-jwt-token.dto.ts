import { ROLE } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class CreateJwtTokenDto {
  @IsUUID()
  @IsNotEmpty()
  userId: number;

  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsNotEmpty()
  email: string;

  @IsEnum(ROLE)
  @IsNotEmpty()
  role: ROLE;
}
