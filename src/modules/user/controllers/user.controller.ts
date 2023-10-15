import {
  BadRequestException,
  Body,
  ConflictException,
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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindUserDto } from '../dtos/find-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorDto } from '../dtos/professor/create-professor.dto';
import { CreateStudentDto } from '../dtos/student/create-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly professorService: ProfessorService,
  ) {}

  @Public()
  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      const { email } = body;

      if ((await this.userService.findByEmail(email)) !== null) {
        throw new ConflictException(`Email "${email}" already exists`);
      }

      return await this.userService.create(body);
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  @Public()
  @Post('professor')
  async createProfessor(@Body() body: CreateProfessorDto) {
    try {
      return await this.userService.createProfessor(body);
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  @Public()
  @Post('student')
  async creatStudent(@Body() body: CreateStudentDto) {
    try {
      const { professorId } = body;

      if (professorId) {
        if (!(await this.professorService.findById(professorId))) {
          throw new NotFoundException(
            `Professor with ID "${professorId}" not found`,
          );
        }
      }

      return await this.userService.createStudent(body);
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindUserDto) {
    try {
      return await this.userService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      return user;
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() { email, ...body }: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.findById(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      if (email) {
        if (email === user.email) {
          throw new BadRequestException(`Your email is already "${email}"`);
        }

        if (
          (await this.userService.findByEmail(email)) &&
          email !== user.email
        ) {
          throw new ConflictException(`Email "${email}" already exists`);
        }
      }

      if (email && (await this.userService.findByEmail(email))) {
        throw new ConflictException(`Email "${email}" already exists`);
      }

      return await this.userService.update(id, { email, ...body });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      const user = await this.userService.delete(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      return await this.userService.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicutre(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const user = await this.userService.delete(id);

      if (!user) {
        throw new NotFoundException(`User with ID "${id}" not found`);
      }

      return await this.userService.uploadProfilePicutre(
        id,
        file,
        `users/${id}/profile-picture`,
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
