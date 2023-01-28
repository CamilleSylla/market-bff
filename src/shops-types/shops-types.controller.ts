import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateShopTypeDTO } from './dto/create.validation';
import { UpdateShopsTypeDto } from './dto/update.validation';
import { ShopsTypesService } from './shops-types.service';

@Controller('/admin/shops-types')
export class ShopsTypesController {
  constructor(private readonly shopsTypesService: ShopsTypesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateShopTypeDTO) {
    return await this.shopsTypesService.create(dto);
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    return await this.shopsTypesService.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.shopsTypesService.findOne(+id);
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() dto: UpdateShopsTypeDto) {
    return await this.shopsTypesService.update(+id, dto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    return await this.shopsTypesService.remove(+id);
  }
}
