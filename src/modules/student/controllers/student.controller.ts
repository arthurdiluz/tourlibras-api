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
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentService } from '../services/student.service';
import { UserService } from 'src/modules/user/services/user.service';
import { Public } from 'src/common/decorators';
import { CreateStudentDto, FindStudentDto, UpdateStudentDto } from '../dtos';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';

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

      if (professorId) {
        if (!(await this.professorService.findById(professorId))) {
          throw new NotFoundException(
            `Professor with ID "${professorId}" not found`,
          );
        }
      }

      return await this.studentService.create(body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

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
  async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
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
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() { professorId, ...body }: UpdateStudentDto,
  ) {
    try {
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
  async delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.studentService.delete(id);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
