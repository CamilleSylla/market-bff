import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { SellersService } from 'src/sellers/sellers.service';
import { LoginCredentialsDTO } from './auth.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private sellerService: SellersService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: LoginCredentialsDTO) {
    const { email, password } = credentials;

    try {
      const seller = await this.sellerService.findOneByEmail(email);
      if (!seller) {
        throw `No seller found for : ${email}`;
      }

      const match = await bcrypt.compare(password, seller.password);

      if (!match) {
        throw `Passwords not matching`;
      }

      const { password: dog, ...user } = seller;
      const access_token = this.jwtService.sign(
        { ...user, manager: true },
        {
          secret: process.env.JWT_SECRET,
        },
      );

      return {
        access_token,
        user,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
