import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Sellers } from 'src/entities/sellers.entity';
import { SellersService } from 'src/sellers/sellers.service';
import { TOTPController } from './totp.controller';
import { TOTPService } from './totp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sellers])],
  controllers: [TOTPController],
  providers: [TOTPService, SellersService, AuthService, JwtService],
  exports: [TOTPService],
})
export class TOTPModule {}
