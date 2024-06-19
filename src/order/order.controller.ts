import { Body, Controller, Get, Param, ParseIntPipe,Post, Put, SetMetadata, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { AuthorizationGuard } from "src/guard/authorization.guard";
import { userType } from "@prisma/client";
import { User } from "src/decorator/user.decorator";
import { UserInterface } from "src/user/user.service";
import { applyCouponDto } from "./dto/apply.coupon.dto";
import { UpdateOrderDto } from "./dto/update.order.dto";



@Controller("orders")
export class OrderController {
    constructor(
        private orderSrv:OrderService
    ){};
    @Post()
    @UseGuards(AuthenticationGuard)
    createOrder(
        @User() user:UserInterface
    ){
        return this.orderSrv.createOrder(user);
    };
    @Put(":orderId/status")
    @UseGuards(AuthenticationGuard)
    updateOrder(
        @User() user:UserInterface,
        @Param("orderId",ParseIntPipe) orderId:number,
        @Body() body:UpdateOrderDto
    ){
        return this.orderSrv.updateOrderStatus(user,body,orderId);
    };
    @Post("apply-coupon")
    @UseGuards(AuthenticationGuard)
    getAllUserOrders(
        @User() user:UserInterface,
        @Body() body:applyCouponDto
    ){
        return this.orderSrv.applyCoupon(body,user);
    };
    @Get(":orderId")
    @UseGuards(AuthenticationGuard)
    getOrderById(
        @User() user:UserInterface,
        @Param("orderId",ParseIntPipe) orderId:number 
    ){
        return this.orderSrv.getOrderById(user,orderId);
    };
};