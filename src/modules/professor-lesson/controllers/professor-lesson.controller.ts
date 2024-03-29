import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfessorLessonService } from '../services/professor-lesson.service';
import { ProfessorService } from 'src/modules/professor/services/professor.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateProfessorLessonDto } from '../dtos/create-professor-lesson.dto';
import { FindProfessorLessonDto } from '../dtos/find-professor-lesson.dto';
import { UpdateProfessorLessonDto } from '../dtos/update-professor-lesson.dto';
import { ProfessorMedalService } from 'src/modules/professor-medal/services/professor-medal.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('professor')
export class ProfessorLessonController {
  constructor(
    private readonly professorLessonService: ProfessorLessonService,
    private readonly professorService: ProfessorService,
    private readonly medalService: ProfessorMedalService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/lesson')
  async create(
    @Param('id') id: number,
    @Body() body: CreateProfessorLessonDto,
  ) {
    const { medalId } = body;

    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    if (medalId) {
      if (!(await this.medalService.findById(medalId))) {
        throw new BadRequestException(
          `Medal with ID #${medalId} does not exists`,
        );
      }
    }

    return await this.professorLessonService.create(id, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/lesson')
  async find(@Param('id') id: number, @Query() query: FindProfessorLessonDto) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    return await this.professorLessonService.find(id, query);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/lesson/:lessonId')
  async findById(@Param('id') id: number, @Param('lessonId') lessonId: number) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    const lesson = await this.professorLessonService.findById(lessonId);

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID #${id} not found`);
    }

    return lesson;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id/lesson/:lessonId')
  async update(
    @Param('id') id: number,
    @Param('lessonId') lessonId: number,
    @Body() body: UpdateProfessorLessonDto,
  ) {
    const { medalId } = body;

    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    if (medalId) {
      if (!(await this.medalService.findById(medalId))) {
        throw new BadRequestException(
          `Medal with ID #${medalId} does not exists`,
        );
      }
    }

    return await this.professorLessonService.update(lessonId, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id/lesson/:lessonId')
  async delete(@Param('id') id: number, @Param('lessonId') lessonId: number) {
    if (!(await this.professorService.findById(id))) {
      throw new BadRequestException(`Professor with ID #${id} does not exists`);
    }

    if (!(await this.professorLessonService.findById(lessonId))) {
      throw new BadRequestException(
        `Lesson with ID #${lessonId} does not exists`,
      );
    }

    return await this.professorLessonService.delete(lessonId);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post(':professorId/lesson/:lessonId/icon')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicutre(
    @Param('professorId') professorId: number,
    @Param('lessonId') lessonId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const professor = await this.professorLessonService.findById(professorId);

    if (!professor) {
      throw new NotFoundException(
        `Professor with ID "${professorId}" not found`,
      );
    }

    return await this.professorLessonService.uploadIcon(
      lessonId,
      file,
      `professors/${professorId}/lessons/${lessonId}/icon/`,
    );
  }
}
