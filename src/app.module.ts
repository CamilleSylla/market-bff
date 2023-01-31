import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellersModule } from './sellers/sellers.module';
import { ShopsModule } from './shops/shops.module';
import { ShopsTypesModule } from './shops-types/shops-types.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';
import { TOTPModule } from './totp/totp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SellersModule,
    ShopsModule,
    ShopsTypesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    JwtModule,
    TOTPModule,
  ],

  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
