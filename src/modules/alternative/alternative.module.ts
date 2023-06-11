import { Module } from '@nestjs/common';
import { AlternativeService } from './services/alternative.service';
import { AlternativeController } from './controllers/alternative.controller';
import { AlternativeRepository } from './repositories/alternative.repository';

@Module({
  imports: [],
  controllers: [AlternativeController],
  providers: [AlternativeService, AlternativeRepository],
  exports: [AlternativeService, AlternativeRepository],
})
export class AlternativeModule {}
