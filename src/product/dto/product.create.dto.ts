import { IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    price:number;
    @IsNotEmpty()
    @IsNumber()
    stock:number;
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    description:string;
};