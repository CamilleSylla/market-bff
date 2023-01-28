import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { Products } from './products.entity';
import { Sizes } from './sizes.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Products)
  product: Products;

  @ManyToOne(type => Sizes)
  size: Sizes;
  
  @Column({ type: 'int' })
  quantity: number;
}