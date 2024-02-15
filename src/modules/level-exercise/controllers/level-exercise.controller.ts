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
import { LevelExerciseService } from '../services/level-exercise.service';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateLevelExerciseDto } from '../dtos/exercise/create-level-exercise.dto';
import { FindLevelExerciseDto } from '../dtos/exercise/find-level-exercise.dto';
import { UpdateLevelExerciseDto } from '../dtos/exercise/update-level-exercise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfessorLessonService } from 'src/modules/professor-lesson/services/professor-lesson.service';

@Controller('level')
export class LevelExerciseController {
  constructor(
    private readonly levelExerciseService: LevelExerciseService,
    private readonly LevelService: LessonLevelService,
    private readonly lessonService: ProfessorLessonService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/exercise')
  async create(@Param('id') id: number, @Body() body: CreateLevelExerciseDto) {
    if (!(await this.LevelService.findById(id))) {
      throw new BadRequestException(`Level with ID #${id} not found`);
    }

    return await this.levelExerciseService.create(id, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/exercise')
  async find(@Param('id') id: number, @Query() query: FindLevelExerciseDto) {
    if (!(await this.LevelService.findById(id))) {
      throw new BadRequestException(`Level with ID #${id} not found`);
    }

    return await this.levelExerciseService.find(id, query);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/exercise/:exerciseId')
  async findById(
    @Param('id') id: number,
    @Param('exerciseId') exerciseId: number,
  ) {
    if (!(await this.LevelService.findById(id))) {
      throw new BadRequestException(`Level with ID #${id} not found`);
    }

    const exercise = await this.levelExerciseService.findById(exerciseId);

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID #${exerciseId} not found `);
    }

    return exercise;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Patch(':id/exercise/:exerciseId')
  async update(
    @Param('id') id: number,
    @Param('exerciseId') exerciseId: number,
    @Body() body: UpdateLevelExerciseDto,
  ) {
    if (!(await this.LevelService.findById(id))) {
      throw new BadRequestException(`Level with ID #${id} not found`);
    }

    if (!(await this.levelExerciseService.findById(exerciseId))) {
      throw new BadRequestException(`Exercise with ID #${id} not found`);
    }

    return await this.levelExerciseService.update(exerciseId, body);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Delete(':id/exercise/:exerciseId')
  async delete(
    @Param('id') id: number,
    @Param('exerciseId') exerciseId: number,
  ) {
    if (!(await this.LevelService.findById(id))) {
      throw new BadRequestException(`Level with ID #${id} not found`);
    }

    if (!(await this.levelExerciseService.findById(exerciseId))) {
      throw new BadRequestException(`Exercise with ID #${id} not found`);
    }

    return await this.levelExerciseService.delete(exerciseId);
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/exercise/:exerciseId/alternative/:alternativeId')
  async findAlternativeById(
    @Param('id') id: number,
    @Param('exerciseId') exerciseId: number,
    @Param('alternativeId') alternativeId: number,
  ) {
    if (!(await this.LevelService.findById(id))) {
      throw new BadRequestException(`Level with ID #${id} not found`);
    }

    if (!(await this.levelExerciseService.findById(exerciseId))) {
      throw new BadRequestException(`Exercise with ID #${id} not found`);
    }

    const alternative = await this.levelExerciseService.findAlternativeById(
      exerciseId,
    );

    if (!alternative) {
      throw new NotFoundException(
        `alternative with ID #${alternativeId} not found `,
      );
    }

    return alternative;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Post(':levelId/exercise/:exerciseId/video')
  @UseInterceptors(FileInterceptor('file'))
  async uploadVideo(
    @Param('levelId') levelId: number,
    @Param('exerciseId') exerciseId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const level = await this.LevelService.findById(levelId);

    if (!level) {
      throw new BadRequestException(`Level with ID #${levelId} not found`);
    }

    const exercise = await this.levelExerciseService.findById(exerciseId);

    if (!exercise) {
      throw new NotFoundException(`Exercise with ID #${exerciseId} not found `);
    }

    const lesson = await this.lessonService.findById(level.lessonId);
    const { professorId } = await this.lessonService.findById(lesson.id);

    return await this.levelExerciseService.uploadVideo(
      exerciseId,
      file,
      `/professors/${professorId}/lessons/${level.lessonId}/levels/${levelId}/exercises/${exerciseId}`,
    );
  }
}
