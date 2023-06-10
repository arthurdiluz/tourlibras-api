import { Module } from '@nestjs/common';
import { MedalService } from './services/medal.service';
import { MedalController } from './controllers/medal.controller';
import { MedalRepository } from './repositories/medal.repository';

@Module({
  imports: [],
  controllers: [MedalController],
  providers: [MedalService, MedalRepository],
  exports: [MedalService, MedalRepository],
})
export class MedalModule {}
