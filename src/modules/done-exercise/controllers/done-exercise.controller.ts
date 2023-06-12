import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DoneExerciseService } from '../services/done-exercise.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt';
import { CreateDoneExerciseDto } from '../dtos/create-done-exercise.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { ExerciseService } from 'src/modules/exercise/services/exercise.service';

@ApiTags('Done Exercise')
@Controller('done-exercise')
export class DoneExerciseController {
  constructor(
    private readonly doneExerciseService: DoneExerciseService,
    private readonly userService: UserService,
    private readonly exerciseService: ExerciseService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post()
  async create(@Body() body: CreateDoneExerciseDto) {
    const { userId, exerciseId } = body;

    if (!(await this.userService.findById(userId))) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    if (!(await this.exerciseService.findById(exerciseId))) {
      throw new NotFoundException(`Exercise with ID "${exerciseId}" not found`);
    }

    return await this.doneExerciseService.create(body);
  }
}
