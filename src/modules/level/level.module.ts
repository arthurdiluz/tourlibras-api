import { Module } from '@nestjs/common';
import { LevelService } from './services/level.service';
import { LevelController } from './controllers/level.controller';
import { LevelRepository } from './repositories/level.repository';

@Module({
  imports: [],
  controllers: [LevelController],
  providers: [LevelService, LevelRepository],
  exports: [LevelService, LevelRepository],
})
export class LevelModule {}
