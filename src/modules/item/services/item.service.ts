import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { CreateItemDto } from '../dtos/create-item.dto';
import { FindItemDto } from '../dtos/find-item.dto';
import { UpdateItemDto } from '../dtos/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async create({ professorId, ...body }: CreateItemDto) {
    return this.itemRepository.create({
      data: {
        Professor: { connect: { id: professorId } },
        ...body,
      },
    });
  }

  async find({ name, description, ...query }: FindItemDto) {
    return this.itemRepository.find({
      where: {
        name: { contains: name, mode: 'insensitive' },
        description: { contains: description, mode: 'insensitive' },
        ...query,
      },
    });
  }

  async findById(itemId: string) {
    return this.itemRepository.findById({ where: { id: itemId } });
  }

  async update(id: string, body: UpdateItemDto) {
    return this.itemRepository.update({
      where: { id },
      data: { ...body },
    });
  }

  async delete(id: string) {
    return this.itemRepository.delete({ where: { id } });
  }
}
