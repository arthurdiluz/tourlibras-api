import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from '../services/student.service';
import { UserService } from 'src/modules/user/services/user.service';
import { Public } from 'src/common/decorators';
import { CreateStudentDto } from '../dtos';
import { ProfessorService } from 'src/modules/professor/services/professor.service';

@ApiTags('Student')
@Controller('api/v1/student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly userService: UserService,
    private readonly professorService: ProfessorService,
  ) {}

  @Public()
  @Post()
  async create(@Body() body: CreateStudentDto) {
    try {
      const { userId, professorId } = body;

      if (!(await this.userService.findById(userId))) {
        throw new NotFoundException(`User with ID "${userId}" not found`);
      }

      if (!(await this.professorService.findById(professorId))) {
        throw new NotFoundException(
          `Professor with ID "${professorId}" not found`,
        );
      }

      return await this.studentService.create(body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
