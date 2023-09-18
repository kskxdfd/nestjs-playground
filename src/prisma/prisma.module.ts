import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [PrismaService],
  exports: [PrismaService, PrismaClient],
})
export class PrismaModule {}
