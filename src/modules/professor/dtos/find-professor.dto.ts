import { ApiPropertyOptional } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { FindUserDto } from 'src/modules/user/dtos';

export class FindProfessorDto extends FindUserDto {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: Grammar.OSV,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: Grammar;
}
