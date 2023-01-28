import { Injectable, BadRequestException } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopType } from 'src/entities/shop-type.entity';
import { Repository } from 'typeorm';
import { CreateShopTypeDTO } from './dto/create.validation';
import { UpdateShopsTypeDto } from './dto/update.validation';

@Injectable()
export class ShopsTypesService {
  private readonly logger = new Logger(ShopsTypesService.name);
  constructor(
    @InjectRepository(ShopType)
    private readonly shopTypeRepository: Repository<ShopType>,
  ) {}
  async create(dto: CreateShopTypeDTO) {
    try {
      const { name } = dto;
      await this.shopTypeRepository.save(dto);
      this.logger.log(`${name} as been created`);
      return `${name} as been created`;
    } catch (error) {
      this.logger.error(error);
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    return {
      types: await this.shopTypeRepository.find(),
    };
  }

  async findOne(id: number) {
    return await this.shopTypeRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateShopsTypeDto) {
    try {
      const { name } = dto;
      await this.shopTypeRepository.update(id, dto);
      return `${name} as been updated`;
    } catch (error) {
      this.logger.error(error.message);
      return new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      const { name } = await this.shopTypeRepository.findOneBy({ id });
      await this.shopTypeRepository.delete(id);
      this.logger.log(`${name} as been created`);
      return `${name} as been deleted`;
    } catch (error) {
      this.logger.error(error.message);
      return new BadRequestException(error.message);
    }
  }
}
