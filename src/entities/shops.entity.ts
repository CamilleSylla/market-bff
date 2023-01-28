import { IsEmail, IsNotEmpty, IsMobilePhone, IsString, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from 'typeorm';
import { Sellers } from './sellers.entity';
import { ShopType } from './shop-type.entity';

@Entity()
export class Shops {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
  
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ default: null })
  @IsString()
  logo: string;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  @IsString()
  siret: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  adress_name: string;
  
  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  adress_city: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  adress_number: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  adress_zip: number;

  @OneToOne(type => Sellers, seller => seller.main_seller)
  owner: Sellers;

  @OneToMany(type => Sellers, seller => seller.shop)
  sellers: Sellers[];

  @ManyToOne(type => ShopType, type => type.shops)
  type: ShopType

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
