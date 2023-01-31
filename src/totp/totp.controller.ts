import {
  ClassSerializerInterceptor,
  Controller,
  Header,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSellersDTO } from 'src/sellers/seller.validation';
import { TOTPService } from './totp.service';

@Controller('totp')
@UseInterceptors(ClassSerializerInterceptor)
export class TOTPController {
  constructor(private readonly totpService: TOTPService) {}

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
}
