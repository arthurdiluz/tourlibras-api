import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: Boolean,
    required: true,
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean = false;

  @ApiProperty({
    type: String,
    required: true,
    example: 'John Smith',
  })
  @IsString()
  @Length(3, 31)
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john.smith',
  })
  @Matches(/^[a-z0-9_.]+$/)
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'J&8dqQ8^N!MtQ3igG6$m@6f4tK@H%*9$uSCbmDLg54Z4#TSgE%272tULqFJAx2$U',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'blob:xvclSFAVcaZZVC',
  })
  @IsString()
  @IsNotEmpty()
  @Length(0, 255)
  profilePhoto: string;
}
