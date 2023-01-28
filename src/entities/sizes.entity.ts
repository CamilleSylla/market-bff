import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';


@Entity()
export class Sizes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}