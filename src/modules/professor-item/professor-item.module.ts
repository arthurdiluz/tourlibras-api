import { Module } from '@nestjs/common';
import { ProfessorItemController } from './controllers/professor-item.controller';
import { ProfessorItemService } from './services/professor-item.service';
import { ProfessorItemRepository } from './repositories/professor-item.repository';
import { ProfessorModule } from '../professor/professor.module';

@Module({
  imports: [ProfessorModule],
  controllers: [ProfessorItemController],
  providers: [ProfessorItemService, ProfessorItemRepository],
  exports: [ProfessorItemService],
})
export class ProfessorItemModule {}
