import { Injectable } from '@nestjs/common';
import { ProfessorItemRepository } from '../repositories/professor-item.repository';
import { CreateProfessorItemDto } from '../dtos/create-professor-item.dto';

@Injectable()
export class ProfessorItemService {
  constructor(private readonly itemRepository: ProfessorItemRepository) {}

  async create(id: number, body: CreateProfessorItemDto) {
    return this.itemRepository.create({
      data: {
        Professor: { connect: { id } },
        ...body,
      },
      include: { Professor: true },
    });
  }
}
