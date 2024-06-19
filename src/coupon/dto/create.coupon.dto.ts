import { IsDate, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCouponDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsDate()
    couponExpiresIn:Date;
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    discount : number;
};