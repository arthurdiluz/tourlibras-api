import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}
}
