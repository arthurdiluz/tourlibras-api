import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: Boolean,
    required: true,
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'Jamas Johnson',
  })
  @IsOptional()
  @IsString()
  @MaxLength(31)
  fullName?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'james_johnson',
  })
  @IsOptional()
  @Matches(/^[a-z0-9_.]+$/)
  @IsString()
  @Length(3, 15)
  username?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: '6&4S#uJ@h93h#@wG3R9QFsWbzGS^^$b4!i3QV2HLhC^%^%#F8iy5BmNoifrU!#A',
  })
  @IsOptional()
  @IsStrongPassword()
  @Length(8, 63)
  password?: string;

  @ApiPropertyOptional({
    type: String,
    required: true,
    example: 'blob:xvclSFAVcaZZVC',
  })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  profilePhoto?: string;
}
