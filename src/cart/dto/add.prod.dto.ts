import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class addProductDto {
    @IsNotEmpty()
    @IsInt()
    productId: number;
};