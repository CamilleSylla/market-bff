import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDTO } from './auth.validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServcie: AuthService) {}

  @Post('/seller/login')
  auth(@Body() credentials: LoginCredentialsDTO) {
    try {
      return this.authServcie.login(credentials);
    } catch (error) {
      return error;
    }
  }
}
