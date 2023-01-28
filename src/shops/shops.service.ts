import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shops } from 'src/entities/shops.entity';
import { Sellers } from 'src/entities/sellers.entity';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { CreateSellersDTO } from 'src/sellers/seller.validation';
import { CreateShopsDTO } from './shops.validation';

@Injectable()
export class ShopsService {
  private readonly logger = new Logger(ShopsService.name);
  constructor(
    @InjectRepository(Sellers)
    private readonly sellerRepository: Repository<Sellers>,
    @InjectRepository(Shops)
    private readonly shopsRepository: Repository<Shops>,
  ) {}
  async create(data: { user: CreateSellersDTO; org: CreateShopsDTO }) {
    try {
      const { user, org } = data;

      const new_seller = await this.createSeller(user);
      const new_shop = await this.createShop(org, new_seller);
      this.logger.log(
        `${user.email} as been created and is owner of ${new_shop.name}`,
      );
      return {
        succes: true,
        message: `${user.email} as been created and is owner of ${new_shop.name}`,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.shopsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  update(id: number, updateShopDto) {
    return `This action updates a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }

  private async createSeller(seller: CreateSellersDTO) {
    const password = await bcrypt.hash(seller.password, 10);
    return this.sellerRepository.save({ ...seller, password });
  }

  private async createShop(shop: CreateShopsDTO, user: CreateSellersDTO) {
    const { password, ...seller } = user;
    const ownership = {
      sellers: [seller],
      main_seller: seller,
    };
    return this.shopsRepository.save({ ...shop, ...ownership });
  }
}
