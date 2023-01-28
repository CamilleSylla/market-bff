import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateShopsTypeDto {
    @IsNotEmpty()
    @IsNumber()
    id: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;
}