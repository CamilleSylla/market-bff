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
// export class Sellers {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ nullable: false, unique: true })
//   @IsEmail()
//   @IsNotEmpty()
//   @IsString()
//   email: string;

//
//   @IsNotEmpty()
//   @IsString()
//   password: string;

//
//   @IsNotEmpty()
//   @IsString()
//   first_name: string;

//
//   @IsNotEmpty()
//   @IsString()
//   last_name: string;

//   @Column({default: false})
//   active: boolean;

//   @ManyToOne(type => Shops, shop => shop.sellers)
//   shop: Shops;

//   @OneToOne(type => Shops, shop => shop.owner)
//   main_seller: Shops;

//   @OneToMany(type => Products, product => product.seller)
//   products: Products[];

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   created_at: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updated_at: Date;
// }
