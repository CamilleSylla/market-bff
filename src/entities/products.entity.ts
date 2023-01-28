import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './categories.entity';
import { Sellers } from './sellers.entity';
import { Sizes } from './sizes.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column()
  image: string;

  @ManyToOne(type => Sellers, seller => seller.products)
  seller: Sellers;
  
  @ManyToOne(type => Category, category => category.products)
  category: Category;

  @ManyToMany(type => Sizes)
  @JoinTable()
  sizes: Sizes[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}