import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UsernameDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'john.smith',
  })
  @Matches(/^[a-z0-9_.-]+$/)
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  username: string;
}
