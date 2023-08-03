import { Transform } from 'class-transformer';
import { IsUUID, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class CreateJwtTokenDto {
  @IsUUID()
  @IsNotEmpty()
  userId: number;

  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsNotEmpty()
  email: string;
}
