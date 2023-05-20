import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProfessorModule } from '../professor/professor.module';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { StudentRepository } from './repositories/student.repository';

@Module({
  imports: [UserModule, ProfessorModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentService, StudentRepository],
})
export class StudentModule {}
