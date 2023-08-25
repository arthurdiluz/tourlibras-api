import { Transform } from 'class-transformer';
import { CreateUserDto } from '../create-user.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { ROLE } from '@prisma/client';

export class CreateStudentDto extends CreateUserDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  professorId?: number;

  role: ROLE = 'STUDENT';
}
