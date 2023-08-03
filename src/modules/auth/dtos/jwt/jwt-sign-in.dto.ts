import { Transform } from 'class-transformer';
import { IsEmail, MaxLength, IsNotEmpty } from 'class-validator';

export class JwtSignInDto {
  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsNotEmpty()
  email: string;

  @MaxLength(63)
  @IsNotEmpty()
  password: string;
}
