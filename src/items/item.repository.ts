import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { ItemStatus } from './item-status.enum';
import { Item } from '@prisma/client';

@Injectable()
export class ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  async findOne(id: string): Promise<Item> {
    return this.prisma.item.findFirst({
      where: { id: id },
    });
  }

  async createItem(createItemDto: CreateItemDto) {
    const { name, price, description } = createItemDto;
    return this.prisma.item.create({
      data: {
        id: uuid(),
        name: name,
        price: price,
        description: description,
        status: ItemStatus.ON_SALE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async update(id: string): Promise<Item> {
    return this.prisma.item.update({
      where: { id: id },
      data: { status: ItemStatus.SOLD_OUT },
    });
  }

  async delete(id: string): Promise<Item> {
    return this.prisma.item.delete({
      where: { id: id },
    });
  }
}
