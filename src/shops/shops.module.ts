import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sellers } from 'src/entities/sellers.entity';
import { Shops } from 'src/entities/shops.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sellers, Shops])],
  controllers: [ShopsController],
  providers: [ShopsService]
})
export class ShopsModule {}
