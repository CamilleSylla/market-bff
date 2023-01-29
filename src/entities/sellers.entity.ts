import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Products } from './products.entity';
import { Shops } from './shops.entity';

@Entity()
export class Sellers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column({ nullable: false, length: 120 })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @Column({ nullable: false, default: '' })
  @IsNotEmpty()
  @IsString()
  adress_name: string;

  @Column({ nullable: false, default: '' })
  @IsNotEmpty()
  @IsString()
  adress_city: string;

  @Column({ nullable: false, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  adress_number: number;

  @Column({ nullable: false, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  adress_zip: number;

  @Column({ default: false })
  active: boolean;

  @Column({ default: null })
  refresh_token: string;

  @ManyToOne((type) => Shops, (shop) => shop.sellers)
  shop: Shops;

  @OneToOne((type) => Shops, (shop) => shop.owner)
  main_seller: Shops;

  @OneToMany((type) => Products, (product) => product.seller)
  products: Products[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
