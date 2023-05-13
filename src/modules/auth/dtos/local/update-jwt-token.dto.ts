import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class UpdateRefreshTokenDto {
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
  })
  @IsString()
  @IsJWT()
  token: string;
}
