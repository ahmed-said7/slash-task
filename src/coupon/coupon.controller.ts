import { Body, Controller,  Post,SetMetadata, UseGuards} from "@nestjs/common";
import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./dto/create.coupon.dto";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { AuthorizationGuard } from "src/guard/authorization.guard";
import { userType } from "@prisma/client";



@Controller("coupon")
export class CouponController {
    constructor(private couponService:CouponService){};
    @Post()
    @UseGuards(AuthenticationGuard)
    createCoupon(@Body() body:CreateCouponDto){
        return this.couponService.createCoupon(body);
    };
};