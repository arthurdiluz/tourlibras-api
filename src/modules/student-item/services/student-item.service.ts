import { ForbiddenException, Injectable } from '@nestjs/common';
import { StudentItemRepository } from '../repositories/student-item.repository';
import { StudentService } from 'src/modules/student/services/student.service';
import { ProfessorItemService } from 'src/modules/professor-item/services/professor-item.service';

@Injectable()
export class StudentItemService {
  constructor(
    private readonly studentItemRepository: StudentItemRepository,
    private readonly studentService: StudentService,
    private readonly itemService: ProfessorItemService,
  ) {}

  async linkItemToStudent(studentId: number, itemId: number) {
    const [{ money }, { price }] = await Promise.all([
      await this.studentService.findById(studentId),
      await this.itemService.findById(itemId),
    ]);

    if (price > money) {
      throw new ForbiddenException(
        `Insufficient funds. Earn ${price - money} and try again`,
      );
    }

    await this.studentService.update(studentId, { money: money - price });

    return this.studentItemRepository.create({
      data: {
        Student: { connect: { id: studentId } },
        Item: { connect: { id: itemId } },
      },
      include: { Student: { include: { Items: true } }, Item: true },
    });
  }
}
