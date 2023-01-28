import { IsNotEmpty, IsString } from "class-validator";

export class CreateShopTypeDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}