import { Injectable, Inject } from '@nestjs/common';
import { authenticator } from 'otplib';
import { CreateSellersDTO } from 'src/sellers/seller.validation';
import { SellersService } from 'src/sellers/sellers.service';
import { toFileStream } from 'qrcode';
import { Sellers } from 'src/entities/sellers.entity';

@Injectable()
export class TOTPService {
  constructor(private readonly sellerService: SellersService) {}

  public async generateSellerTOTPSecret(
    user: CreateSellersDTO & { id: number },
  ) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(
      user.email,
      process.env.TWO_FACTOR_APP_NAME,
      secret,
    );
    await this.sellerService.setTwoFactorAuthenticationSecret(user.id, secret);

    return {
      secret,
      otpauthUrl,
    };
  }

  public isTotpCodeValid(
    twoFactorAuthenticationCode: string,
    user: Sellers & { id: number },
  ) {
    return authenticator.verify({
      //What is the token ?
      token: twoFactorAuthenticationCode,
      secret: user.totp_secret,
    });
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
