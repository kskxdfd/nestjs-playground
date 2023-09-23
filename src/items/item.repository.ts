import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { ItemStatus } from './item-status.enum';
import { Item, User } from '@prisma/client';

@Injectable()
export class ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return this.prisma.item.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            status: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Item> {
    return this.prisma.item.findFirst({
      where: { id: id },
    });
  }

  async createItem(createItemDto: CreateItemDto, user: User) {
    const { name, price, description } = createItemDto;
    return this.prisma.item.create({
      data: {
        id: uuid(),
        name: name,
        price: price,
        description: description,
        status: ItemStatus.ON_SALE,
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }

  async update(id: string, user: User): Promise<Item> {
    const item = await this.prisma.item.findFirst({
      where: { id: id },
    });

    if (!item) {
      throw new BadRequestException('商品が見つかりませんでした');
    }

    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }

    return this.prisma.item.update({
      where: { id: id },
      data: { status: ItemStatus.SOLD_OUT },
    });
  }

  async delete(id: string, user: User): Promise<Item> {
    const item = await this.prisma.item.findFirst({
      where: { id: id },
    });

    if (!item) {
      throw new BadRequestException('商品が見つかりませんでした');
    }

    if (item.userId !== user.id) {
      throw new BadRequestException('他の人の商品を削除することはできません');
    }

    return this.prisma.item.delete({
      where: { id: id },
    });
  }
}
