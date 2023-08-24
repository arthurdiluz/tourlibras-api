import { Module } from '@nestjs/common';
import { StudentModule } from '../student/student.module';
import { StudentItemController } from './controllers/student-item.controller';
import { StudentItemService } from './services/student-item.service';
import { StudentItemRepository } from './repositories/student-item.repository';

@Module({
  imports: [StudentModule, StudentItemModule],
  controllers: [StudentItemController],
  providers: [StudentItemService, StudentItemRepository],
  exports: [StudentItemService],
})
export class StudentItemModule {}
