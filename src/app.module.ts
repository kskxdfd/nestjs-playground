import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { OfficialModule } from './official/official.module';

@Module({
  imports: [ItemsModule, AuthModule, OfficialModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
