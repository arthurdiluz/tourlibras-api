import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateJwtTokenDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsNotEmpty()
  email: string;
}
