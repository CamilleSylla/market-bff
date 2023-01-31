import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sellers } from 'src/entities/sellers.entity';
import { SellersService } from 'src/sellers/sellers.service';
import { TOTPController } from './totp.controller';
import { TOTPService } from './totp.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sellers])],
  controllers: [TOTPController],
  providers: [TOTPService, SellersService],
  exports: [TOTPService],
})
export class TOTPModule {}
