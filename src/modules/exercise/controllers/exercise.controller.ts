import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExerciseService } from '../services/exercise.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateExerciseDto } from '../dtos/create-exercise.dto';
import { FindExerciseDto } from '../dtos/find-exercise.dto';

@ApiTags('Exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async create(@Body() body: CreateExerciseDto) {
    try {
      return await this.exerciseService.create(body);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get()
  async find(@Query() query: FindExerciseDto) {
    try {
      return await this.exerciseService.find(query);
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException(error, { cause: error as Error });
    }
  }
}
