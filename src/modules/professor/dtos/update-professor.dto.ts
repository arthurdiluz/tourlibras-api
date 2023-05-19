import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Grammar } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { UpdateUserDto } from 'src/modules/user/dtos';

export class UpdateProfessorDto extends PartialType(UpdateUserDto) {
  @ApiPropertyOptional({
    type: String,
    required: false,
    example: Grammar.VSO,
  })
  @IsEnum(Grammar)
  @IsOptional()
  grammar?: Grammar;
}
