import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";



@Module({ 
    controllers:[CouponController]
    ,providers:[CouponService],
    imports:[PrismaModule]
})
export class CouponModule {};