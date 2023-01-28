import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Shops } from "./shops.entity";

@Entity()
export class ShopType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    @IsString()
    @IsNotEmpty()
    name: string;

    @OneToMany(type => Shops, shop => shop.type)
    shops: Shops;
}