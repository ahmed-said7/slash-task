import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class deleteProductDto {
    @IsNotEmpty()
    @IsInt()
    recordId: number;
};