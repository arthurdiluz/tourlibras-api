import { Injectable } from '@nestjs/common';
import { ProfessorItemRepository } from '../repositories/professor-item.repository';

@Injectable()
export class ProfessorItemService {
  constructor(private readonly itemRepository: ProfessorItemRepository) {}
}
