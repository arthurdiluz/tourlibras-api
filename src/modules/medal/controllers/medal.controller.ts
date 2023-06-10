import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MedalService } from '../services/medal.service';

@ApiTags('Medal')
@Controller('medal')
export class MedalController {
  constructor(private readonly medalService: MedalService) {}
}
