import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
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

  async loginSeller(credentials: LoginCredentialsDTO) {
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

      const { password: pw, refresh_token: rt, ...user } = seller;
      const { access_token, refresh_token } = await this.generateToken(user);

      await this.setRefreshToken(user, refresh_token);

      return {
        access_token,
        refresh_token,
        user,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async refreshSeller(userId: number, refreshToken: string) {
    const targetUser = await this.sellerService.findOneById(userId);
    const { password, refresh_token, ...user } = targetUser;
    const match = await bcrypt.compare(refreshToken, refresh_token);
    if (!match) {
      return new ForbiddenException('Token expired');
    }
    return {
      acces_token: await this.jwtService.signAsync(
        { ...user, manager: true },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
      user,
    };
  }

  private async setRefreshToken(user: any, refreshToken: string) {
    const refresh_token = await bcrypt.hash(refreshToken, 10);
    await this.sellerService.update(user.id, { refresh_token });
  }

  private async generateToken(user) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { ...user, manager: true },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        { ...user, manager: true },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
