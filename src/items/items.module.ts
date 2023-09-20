import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { PrismaService } from '../prisma/prisma.service';
import { ItemRepository } from './item.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ItemsController],
  providers: [PrismaService, ItemsService, ItemRepository],
  exports: [],
  imports: [AuthModule],
})
export class ItemsModule {}
