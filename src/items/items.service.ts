import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, User } from '@prisma/client';
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

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepository.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    return await this.itemRepository.update(id, user);
  }

  async delete(id: string, user: User): Promise<Item> {
    return await this.itemRepository.delete(id, user);
  }
}
