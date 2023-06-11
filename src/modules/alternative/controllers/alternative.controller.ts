import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlternativeService } from '../services/alternative.service';

@ApiTags('Alternative')
@Controller('alternative')
export class AlternativeController {
  constructor(private readonly alternativeService: AlternativeService) {}
}
