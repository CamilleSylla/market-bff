import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { CreateSellersDTO } from 'src/sellers/seller.validation';
import { ShopsService } from './shops.service';
import { CreateShopsDTO } from './shops.validation';

@Controller('shops')
export class ShopsController {
  private readonly logger = new Logger(ShopsController.name);
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  async create(@Body() body: { user: CreateSellersDTO; org: CreateShopsDTO }) {
    return await this.shopsService.create(body);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}
