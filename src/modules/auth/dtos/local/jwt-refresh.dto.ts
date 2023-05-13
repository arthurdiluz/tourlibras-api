import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsUUID } from 'class-validator';

export class JwtRefreshDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsJWT()
  refreshToken: string;
}
