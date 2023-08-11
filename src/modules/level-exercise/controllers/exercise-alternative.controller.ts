import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ExerciseAlternativeService } from '../services/exercise-alternative.service';
import { LevelExerciseService } from '../services/level-exercise.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { FindExerciseAlternativeDto } from '../dtos/alternative/find-exercise-alternative.dto';

@Controller('exercise')
export class ExerciseAlternativeController {
  constructor(
    private readonly alternativeService: ExerciseAlternativeService,
    private readonly exerciseService: LevelExerciseService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get(':id/alternative')
  async find(
    @Param('id') id: number,
    @Query() query: FindExerciseAlternativeDto,
  ) {
    try {
      if (!(await this.exerciseService.findById(id))) {
        throw new BadRequestException(
          `Exercise with ID #${id} does not exists`,
        );
      }

      return await this.alternativeService.find(id, query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
