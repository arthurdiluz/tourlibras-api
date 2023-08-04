import { Transform } from 'class-transformer';
import { IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

export class JwtSignInDto {
  @Transform(({ value }) => String(value).trim())
  @IsEmail()
  @MaxLength(31)
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => String(value).trim())
  @MaxLength(63)
  @IsNotEmpty()
  password: string;
}
