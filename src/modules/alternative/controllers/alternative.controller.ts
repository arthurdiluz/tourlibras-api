import {
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlternativeService } from '../services/alternative.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateAlternativeDto } from '../dtos/create-alternative.dto';
import { ExerciseService } from 'src/modules/exercise/services/exercise.service';

@ApiTags('Alternative')
@Controller('alternative')
export class AlternativeController {
  constructor(
    private readonly alternativeService: AlternativeService,
    private readonly exerciseService: ExerciseService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async create({ exerciseId, ...body }: CreateAlternativeDto) {
    try {
      if (!(await this.exerciseService.findById(exerciseId))) {
        throw new NotFoundException(
          `Exercise with ID "${exerciseId}" not found`,
        );
      }
      return await this.alternativeService.create({ exerciseId, ...body });
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
