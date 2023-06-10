import { Module } from '@nestjs/common';
import { ItemService } from './services/item.service';
import { ItemController } from './controllers/item.controller';
import { ItemRepository } from './repositories/item.repository';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [ProfessorModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemService, ItemRepository],
})
export class ItemModule {}
