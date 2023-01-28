import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column({ nullable: false })
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

  @Column({default: false})
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
