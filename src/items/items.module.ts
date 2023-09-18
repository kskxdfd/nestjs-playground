import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ItemsController],
  providers: [PrismaService, ItemsService],
  exports: [],
})
export class ItemsModule {}
