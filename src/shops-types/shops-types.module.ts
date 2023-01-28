import { Module } from '@nestjs/common';
import { ShopsTypesService } from './shops-types.service';
import { ShopsTypesController } from './shops-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopType } from 'src/entities/shop-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopType])],
  controllers: [ShopsTypesController],
  providers: [ShopsTypesService]
})
export class ShopsTypesModule {}
