import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ProfessorModule } from '../professor/professor.module';
import { StudentController } from './controllers/student.controller';
import { StudentRepository } from './repositories/student.repository';
import { StudentService } from './services/student.service';

@Module({
  imports: [UserModule, ProfessorModule],
  controllers: [StudentController],
  providers: [StudentService, StudentRepository],
  exports: [StudentService],
})
export class StudentModule {}
