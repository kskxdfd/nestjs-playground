import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.itemRepository.findOne(id);

    if (!found) throw new NotFoundException();

    return found;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto);
  }

  async updateStatus(id: string): Promise<Item> {
    return await this.itemRepository.update(id);
  }

  async delete(id: string): Promise<Item> {
    return await this.itemRepository.delete(id);
  }
}
