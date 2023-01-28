import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginCredentialsDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
