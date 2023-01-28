import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sellers } from 'src/entities/sellers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Sellers)
    private readonly sellerRepository: Repository<Sellers>,
  ) {}
  create(createSellerDto) {
    return 'This action adds a new seller';
  }

  findAll() {
    return `This action returns all sellers`;
  }

  findOneById(id: number) {
    return `This action returns a #${id} seller`;
  }

  async findOneByEmail(email: string) {
    return this.sellerRepository.findOneBy({ email });
  }

  update(id: number, updateSellerDto) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
