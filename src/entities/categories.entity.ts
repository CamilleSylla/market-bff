import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()

export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    @IsString()
    @IsNotEmpty()
    name: string

    @OneToMany(type => Products, product => product.category)
    products: Products[]
}