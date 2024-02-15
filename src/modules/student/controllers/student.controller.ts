import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { StudentService } from '../services/student.service';
import { FindStudentDto } from '../dtos/find-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly professorService: ProfessorService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindStudentDto) {
    return await this.studentService.find(query);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    const student = await this.studentService.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    return student;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() { professorId, ...body }: UpdateStudentDto,
  ) {
    if (!(await this.studentService.findById(id))) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    if (professorId) {
      if (!(await this.professorService.findById(professorId))) {
        throw new NotFoundException(
          `Professor with ID "${professorId}" not found`,
        );
      }
    }

    return await this.studentService.update(id, { professorId, ...body });
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.studentService.delete(id);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/professor/:professorId')
  async joinProfessor(
    @Param('id') id: number,
    @Param('professorId') professorId: number,
  ) {
    if (!(await this.studentService.findById(id))) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    if (!(await this.professorService.findById(professorId))) {
      throw new NotFoundException(
        `Professor with ID "${professorId}" not found`,
      );
    }

    return await this.studentService.joinProfessor(id, professorId);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id/professor/:professorId')
  async leaveProfessor(
    @Param('id') id: number,
    @Param('professorId') professorId: number,
  ) {
    if (!(await this.studentService.findById(id))) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }

    if (!(await this.professorService.findById(professorId))) {
      throw new NotFoundException(
        `Professor with ID "${professorId}" not found`,
      );
    }

    return await this.studentService.leaveProfessor(id, professorId);
  }
}
