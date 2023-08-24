import { Injectable } from '@nestjs/common';
import { StudentItemRepository } from '../repositories/student-item.repository';

@Injectable()
export class StudentItemService {
  constructor(private readonly studentItemRepository: StudentItemRepository) {}
}
