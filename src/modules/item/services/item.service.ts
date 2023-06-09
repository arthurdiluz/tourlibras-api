import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';
import { CreateItemDto } from '../dtos/create-item.dto';
import { FindItemDto } from '../dtos/find-item.dto';

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
}
