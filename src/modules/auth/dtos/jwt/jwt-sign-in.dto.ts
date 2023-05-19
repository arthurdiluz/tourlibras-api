import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class JwtSignInDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'john.smith@example.com',
  })
  @IsEmail()
  @MaxLength(31)
  @Transform(({ value }) => String(value).toLowerCase())
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'u*X^MWuR%&R3Sf%HsNv9#2N$23#%2X!msc2S&9KzK%#!H42C5n7qe&^88Rv6d7*',
  })
  @MaxLength(63)
  @IsNotEmpty()
  password: string;
}
