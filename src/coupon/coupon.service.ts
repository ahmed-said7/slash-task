import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCouponDto } from "./dto/create.coupon.dto";


@Injectable()
export class CouponService {
    constructor(private prisma:PrismaService){};
    async createCoupon(body:CreateCouponDto){
        let coupon=await this.prisma.coupon.findFirst({where:{name:body.name}})
        if( coupon ){
            throw new HttpException("try another coupon code",400);
        };
        coupon=await this.prisma.coupon.create({data:body});
        return {coupon};
    };
};