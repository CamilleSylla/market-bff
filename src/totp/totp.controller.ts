import {
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Sellers } from 'src/entities/sellers.entity';
import { CreateSellersDTO } from 'src/sellers/seller.validation';
import { SellersService } from 'src/sellers/sellers.service';
import { TOTPService } from './totp.service';

@Controller('totp')
@UseInterceptors(ClassSerializerInterceptor)
export class TOTPController {
  constructor(
    private readonly totpService: TOTPService,
    private readonly sellerService: SellersService,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(
    @Res() response: any,
    @Req() request: { user: CreateSellersDTO & { id: number } },
  ) {
    const { otpauthUrl } = await this.totpService.generateSellerTOTPSecret(
      request.user,
    );
    return this.totpService.pipeQrCodeStream(response, otpauthUrl);
  }

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Req() { user }: { user: Sellers & { id: number } },
    @Body() { code }: { code: string },
  ) {
    const isCodeValid = this.totpService.isTotpCodeValid(code, user);
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.sellerService.turnOnTwoFactorAuthentication(user.id);
  }
}
