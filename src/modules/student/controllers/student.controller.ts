import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
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
    try {
      return await this.studentService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      const student = await this.studentService.findById(id);

      if (!student) {
        throw new NotFoundException(`Student with ID "${id}" not found`);
      }

      return student;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() { professorId, ...body }: UpdateStudentDto,
  ) {
    try {
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
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      return await this.studentService.delete(id);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/professor/:professorId')
  async joinProfessor(
    @Param('id') id: number,
    @Param('professorId') professorId: number,
  ) {
    try {
      if (!(await this.studentService.findById(id))) {
        throw new NotFoundException(`Student with ID "${id}" not found`);
      }

      if (!(await this.professorService.findById(professorId))) {
        throw new NotFoundException(
          `Professor with ID "${professorId}" not found`,
        );
      }

      return await this.studentService.joinProfessor(id, professorId);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id/professor/:professorId')
  async leaveProfessor(
    @Param('id') id: number,
    @Param('professorId') professorId: number,
  ) {
    try {
      if (!(await this.studentService.findById(id))) {
        throw new NotFoundException(`Student with ID "${id}" not found`);
      }

      if (!(await this.professorService.findById(professorId))) {
        throw new NotFoundException(
          `Professor with ID "${professorId}" not found`,
        );
      }

      return await this.studentService.leaveProfessor(id, professorId);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
