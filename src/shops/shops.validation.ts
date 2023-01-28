import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsMobilePhone,
  IsString,
  IsNumber,
  IsObject,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { UpdateShopsTypeDto } from 'src/shops-types/dto/update.validation';


export class CreateShopsDTO {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  siret: string;

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

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdateShopsTypeDto)
  type: UpdateShopsTypeDto;
}
// export class UpdateShopsDTO {

//   @IsEmail()
//   @IsNotEmpty()
//   @IsString()
//   email: string;

//   @IsNotEmpty()
//   @IsMobilePhone()
//   phone: string;

//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsString()
//   logo: string;

//   @IsNotEmpty()
//   @IsString()
//   siret: string;

//   @IsNotEmpty()
//   @IsString()
//   adress_name: string;

//   @IsNotEmpty()
//   @IsString()
//   adress_city: string;

//   @IsNotEmpty()
//   @IsNumber()
//   adress_number: number;

//   @IsNotEmpty()
//   @IsNumber()
//   adress_zip: number;

//   @OneToOne(type => Sellers, seller => seller.main_seller)
//   owner: Sellers;

//   @OneToMany(type => Sellers, seller => seller.shop)
//   sellers: Sellers[];

//   @ManyToOne(type => ShopType, type => type.shops)
//   type: ShopType

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   created_at: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updated_at: Date;
// }
