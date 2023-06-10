import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LevelService } from '../services/level.service';

@ApiTags('Level')
@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}
}
