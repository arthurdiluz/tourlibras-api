import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Done Exercise')
@Controller('done-exercise')
export class DoneExerciseController {}
