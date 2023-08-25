import { Module } from '@nestjs/common';
import { StudentModule } from '../student/student.module';
import { StudentItemController } from './controllers/student-item.controller';
import { StudentItemService } from './services/student-item.service';
import { StudentItemRepository } from './repositories/student-item.repository';
import { ProfessorItemModule } from '../professor-item/professor-item.module';

@Module({
  imports: [StudentModule, ProfessorItemModule],
  controllers: [StudentItemController],
  providers: [StudentItemService, StudentItemRepository],
  exports: [StudentItemService],
})
export class StudentItemModule {}
