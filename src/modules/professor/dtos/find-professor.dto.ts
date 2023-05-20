import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { FindUserDto } from 'src/modules/user/dtos';

export class FindProfessorDto extends PartialType(FindUserDto) {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: Grammar.OSV,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: Grammar;
}
