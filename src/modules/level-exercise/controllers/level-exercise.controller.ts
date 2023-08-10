import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LevelExerciseService } from '../services/level-exercise.service';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateLevelExerciseDto } from '../dtos/create-level-exercise.dto';
import { FindLevelExerciseDto } from '../dtos/find-level-exercise.dto';

@Controller('level')
export class LevelExerciseController {
  constructor(
    private readonly levelExerciseService: LevelExerciseService,
    private readonly LevelService: LessonLevelService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':id/exercise')
  async create(@Param('id') id: number, @Body() body: CreateLevelExerciseDto) {
    try {
      if (!(await this.LevelService.findById(id))) {
        throw new BadRequestException(`Level with ID #${id} not found`);
      }

      return await this.levelExerciseService.create(id, body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/exercise')
  async find(@Param('id') id: number, @Query() query: FindLevelExerciseDto) {
    try {
      if (!(await this.LevelService.findById(id))) {
        throw new BadRequestException(`Level with ID #${id} not found`);
      }

      return await this.levelExerciseService.find(id, query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/exercise/:exerciseId')
  async findById(
    @Param('id') id: number,
    @Param('exerciseId') exerciseId: number,
  ) {
    try {
      if (!(await this.LevelService.findById(id))) {
        throw new BadRequestException(`Level with ID #${id} not found`);
      }

      const exercise = await this.levelExerciseService.findById(exerciseId);

      if (!exercise) {
        throw new NotFoundException(
          `Exercise with ID #${exerciseId} not found `,
        );
      }

      return exercise;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
