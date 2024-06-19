import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class applyCouponDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsNumber()
    orderId:number
};