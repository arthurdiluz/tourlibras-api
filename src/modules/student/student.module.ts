import { Module, forwardRef } from '@nestjs/common';
import { ProfessorModule } from '../professor/professor.module';
import { StudentController } from './controllers/student.controller';
import { StudentRepository } from './repositories/student.repository';
import { StudentService } from './services/student.service';

@Module({
  imports: [forwardRef(() => ProfessorModule)],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentService, StudentRepository],
})
export class StudentModule {}
