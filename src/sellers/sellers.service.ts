import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sellers } from 'src/entities/sellers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Sellers)
    readonly sellerRepository: Repository<Sellers>,
  ) {}
  create(createSellerDto) {
    return 'This action adds a new seller';
  }

  findAll() {
    return `This action returns all sellers`;
  }

  async findOneById(id: number) {
    return await this.sellerRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return this.sellerRepository.findOneBy({ email });
  }

  update(id: number, updateSellerDto) {
    return this.sellerRepository.update(id, updateSellerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }

  async setTwoFactorAuthenticationSecret(userId: number, secret: string) {
    return this.sellerRepository.update(userId, {
      totp_secret: secret,
    });
  }

  async turnOnTwoFactorAuthentication(userId: number) {
    return this.sellerRepository.update(userId, {
      totp_enable: true,
    });
  }
}
