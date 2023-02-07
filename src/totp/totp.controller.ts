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
  Get,
  Header,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { AuthService } from 'src/auth/auth.service';
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
    private readonly authService: AuthService,
  ) {}

  @Get('generate')
  @UseGuards(JwtAuthGuard)
  @Header('content-type', 'image/png')
  async register(
    @Res() response: NodeJS.WritableStream,
    @Req() request: { user: CreateSellersDTO & { id: number } },
  ) {
    const { otpauthUrl } = await this.totpService.generateSellerTOTPSecret(
      request.user,
    );
    return this.totpService.pipeQrCodeStream(otpauthUrl, response);
  }

  @Post('turn-on')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async turnOnTwoFactorAuthentication(
    @Req() { user }: { user: Sellers & { id: number } },
    @Body() { code }: { code: string },
  ) {
    console.log('user Id', user);

    const isCodeValid = await this.totpService.isTotpCodeValid(code, user);

    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.sellerService.turnOnTwoFactorAuthentication(user.id);
    const {
      totp_secret,
      refresh_token: rt,
      password,
      ...logUser
    } = await this.sellerService.findOneById(user.id);

    console.log('logged user', logUser);
    const { access_token, refresh_token } =
      await this.authService.generateToken(logUser);
    await this.authService.setRefreshToken(logUser, refresh_token);
    return {
      access_token,
      refresh_token,
      user: logUser,
    };
  }
}
