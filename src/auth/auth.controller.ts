import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateSellersDTO } from 'src/sellers/seller.validation';
import { AuthService } from './auth.service';
import { LoginCredentialsDTO } from './auth.validation';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenGuard } from './jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServcie: AuthService) {}

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  async refresh(
    @Req()
    req: {
      user: CreateSellersDTO & { id: number; refreshToken: string };
    },
  ) {
    return await this.authServcie.refreshSeller(
      req.user.id,
      req.user.refreshToken,
    );
  }

  @Post('/seller/login')
  async auth(@Body() credentials: LoginCredentialsDTO) {
    try {
      return await this.authServcie.loginSeller(credentials);
    } catch (error) {
      return error;
    }
  }
}
