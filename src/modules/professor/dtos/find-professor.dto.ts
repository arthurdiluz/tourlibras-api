import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { FindUserDto } from 'src/modules/user/dtos/find-user.dto';
import { GRAMMAR } from '@prisma/client';

export class FindProfessorDto extends PartialType(FindUserDto) {
  @ApiPropertyOptional({
    type: String,
    enum: GRAMMAR,
    required: false,
    example: GRAMMAR.OSV,
  })
  @IsEnum(GRAMMAR)
  @IsOptional()
  grammar?: GRAMMAR;
}
