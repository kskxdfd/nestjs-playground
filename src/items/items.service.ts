import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './item.model';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.prisma.item.findFirst({
      where: { id: id },
    });

    if (!found) throw new NotFoundException();

    return found;
  }

  create(createItemDto: CreateItemDto): Promise<Item> {
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

  updateStatus(id: string): Promise<Item> {
    return this.prisma.item.update({
      where: { id: id },
      data: { status: ItemStatus.SOLD_OUT },
    });
  }

  delete(id: string): Promise<Item> {
    return this.prisma.item.delete({
      where: { id: id },
    });
  }
}
