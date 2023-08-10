import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LevelExerciseService } from '../services/level-exercise.service';
import { LessonLevelService } from 'src/modules/lesson-level/services/lesson-level.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { CreateLevelExerciseDto } from '../dtos/create-level-exercise.dto';

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
}
