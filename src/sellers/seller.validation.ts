import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateSellersDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  adress_name: string;

  @IsNotEmpty()
  @IsString()
  adress_city: string;

  @IsNotEmpty()
  @IsNumber()
  adress_number: number;

  @IsNotEmpty()
  @IsNumber()
  adress_zip: number;
}
