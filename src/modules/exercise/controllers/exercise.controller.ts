import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExerciseService } from '../services/exercise.service';

@ApiTags('Exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}
}
