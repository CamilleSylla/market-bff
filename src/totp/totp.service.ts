import { Injectable, Inject } from '@nestjs/common';
import { authenticator } from 'otplib';
import { CreateSellersDTO } from 'src/sellers/seller.validation';
import { SellersService } from 'src/sellers/sellers.service';
import { toFileStream, toDataUrl } from 'qrcode';
import { Sellers } from 'src/entities/sellers.entity';
import { PassThrough } from 'stream';

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

  public async isTotpCodeValid(
    twoFactorAuthenticationCode: string,
    user: Sellers & { id: number },
  ) {
    const { totp_secret } = await this.sellerService.findOneById(user.id);
    return authenticator.verify({
      //What is the token ?
      token: twoFactorAuthenticationCode,
      secret: totp_secret,
    });
  }

  public async pipeQrCodeStream(
    otpauthUrl: string,
    res: NodeJS.WritableStream,
  ) {
    const qrStream = new PassThrough();
    toFileStream(qrStream, otpauthUrl, {
      type: 'png',
      width: 200,
      errorCorrectionLevel: 'H',
    });
    qrStream.pipe(res);
  }
}
