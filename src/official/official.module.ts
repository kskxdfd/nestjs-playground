import { Module } from '@nestjs/common';
import { OfficialController } from './official.controller';

@Module({
  controllers: [OfficialController]
})
export class OfficialModule {}
