import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentItemService } from '../services/student-item.service';
import { JwtAccessTokenGuard } from 'src/common/decorators/guards/jwt/jwt-access-token.guard';
import { StudentService } from 'src/modules/student/services/student.service';
import { ProfessorItemService } from 'src/modules/professor-item/services/professor-item.service';

@Controller('student')
export class StudentItemController {
  constructor(
    private readonly studentItemService: StudentItemService,
    private readonly studentService: StudentService,
    private readonly itemService: ProfessorItemService,
  ) {}

  @UseGuards(JwtAccessTokenGuard)
  @Post(':studentId/item/:itemId')
  async linkItemToStudent(
    @Param('studentId') studentId: number,
    @Param('itemId') itemId: number,
  ) {
    if (!(await this.studentService.findById(studentId))) {
      throw new BadRequestException(
        `Student with ID #${studentId} does not exist`,
      );
    }

    if (!(await this.itemService.findById(itemId))) {
      throw new BadRequestException(`Item with ID #${itemId} does not exist`);
    }

    return await this.studentItemService.linkItemToStudent(studentId, itemId);
  }
}
