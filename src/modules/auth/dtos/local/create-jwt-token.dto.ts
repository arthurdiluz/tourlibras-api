import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateTokensDto {
  @ApiProperty({
    type: String,
    required: true,
    example: randomUUID(),
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

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
}
