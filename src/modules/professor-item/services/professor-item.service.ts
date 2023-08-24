import { Injectable } from '@nestjs/common';
import { ProfessorItemRepository } from '../repositories/professor-item.repository';
import { CreateProfessorItemDto } from '../dtos/create-professor-item.dto';
import { FindProfessorItemDto } from '../dtos/find-professor-item.dto';
import { UpdateProfessorItemDto } from '../dtos/update-professor-item.dto';

@Injectable()
export class ProfessorItemService {
  constructor(private readonly itemRepository: ProfessorItemRepository) {}

  async create(professorId: number, body: CreateProfessorItemDto) {
    return this.itemRepository.create({
      data: {
        Professor: { connect: { id: professorId } },
        ...body,
      },
      include: { Professor: true },
    });
  }

  async find(
    professorId: number,
    { name, description, ...query }: FindProfessorItemDto,
  ) {
    return this.itemRepository.findMany({
      where: {
        Professor: { id: professorId },
        name: { contains: name, mode: 'insensitive' },
        description: { contains: description, mode: 'insensitive' },
        ...query,
      },
      include: { Professor: true },
    });
  }

  async findById(id: number) {
    return this.itemRepository.findUnique({
      where: { id },
      include: { Professor: true },
    });
  }

  async update(id: number, { media, ...body }: UpdateProfessorItemDto) {
    return this.itemRepository.update({
      where: { id },
      data: { media, ...body },
      include: { Professor: true },
    });
  }

  async delete(id: number) {
    return this.itemRepository.delete({
      where: { id },
      include: { Professor: true },
    });
  }
}
