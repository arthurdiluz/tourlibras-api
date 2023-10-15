import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from '../auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { ProfessorModule } from '../professor/professor.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    AwsModule,
    ProfessorModule,
    StudentModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
