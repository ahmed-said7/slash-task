import { HttpException, Injectable } from "@nestjs/common";
import { userType } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserInterface } from "src/user/user.service";
import { applyCouponDto } from "./dto/apply.coupon.dto";
import { UpdateOrderDto } from "./dto/update.order.dto";



@Injectable()
export class OrderService {
    constructor(private Prisma:PrismaService){}
    async createOrder(user:UserInterface){
        const cart=await this.Prisma.cart.findFirst({
            where : { userId : user.id },
            include : { items : true }
        });
        if( ! cart ){
            throw new HttpException("cart not found",400)
        };
        const items : { productId:number; quantity?:number; }[]=
            cart.items
            .map(  ({ quantity,productId })  => { return { quantity,productId } } );
        const order=await this.Prisma.order.create({
            data : {
                userId:user.id,
                price :  cart.price,
            }
        });
        let orderItems=await this.Prisma.order.update({ 
            where : { id : order.id },
            data : {
                items : {
                    createMany : {
                        data : items
                    }
                }
            }
        });
        await this.Prisma.cart.delete({ where : { id : cart.id } });
        return { order:orderItems };
    };
    async getOrders(userId:number){
        const orders=await this.Prisma.order.findMany({
            where : { userId },
            include : { items: { include : { product : true } } }
        });
        if( orders.length == 0 ){
            throw new HttpException("no orders found",400)
        };
        return { orders };
    };
    async getOrderById(user:UserInterface,orderId:number){
        let obj={};
        if( user.role == userType.user ){
            obj={ userId : user.id };
        };
        const order=await this.Prisma.order.findFirst({
            where : { ... obj , id : orderId },
            include : { items: { include : { product : true } } }
        });
        if( ! order ){
            throw new HttpException("no order found",400);
        }
        return { order };
    };
    async updateOrderStatus(user:UserInterface,body:UpdateOrderDto,orderId:number){
        let obj={};
        if( user.role == userType.user ){
            obj={ userId : user.id };
        };
        const orderExist=await this.Prisma.order.findFirst({
            where : { ... obj , id : orderId }
        });
        if( ! orderExist ){
            throw new HttpException("no order found",400);
        };
        if( orderExist.status != "pending" ){
            throw new HttpException("order status already changed",400);
        };
        const order=await this.Prisma.order.update({
            where : {  id : orderId },
            data : {
                status : body.status
            },
            include : { items : true }
        });
        if( order.status == "cancelled" ){
            return { order }
        };
        for( let item of order.items ){
            await this.Prisma.product.update({
                where:{id:item.productId},
                data:{
                    stock :{
                        decrement : item.quantity
                    }
                }
            })
        };
        return { order };
    };
    async applyCoupon(body:applyCouponDto,user:UserInterface){
        const coupon=await this.Prisma.coupon.findFirst({
            where: { name: body.name , couponExpiresIn : { gt : new Date() } }
        });
        if( ! coupon ){
            throw new HttpException( "coupon not found" , 400 );
        };
        let order=await this.Prisma.order
            .findFirst({ where : { 
                userId : user.id  , 
                id:body.orderId
            } });
        if(! order ){
            throw new HttpException("order not found",400);
        };
        if( order.status != "pending" ){
            throw new HttpException("order is not pending",400);
        };
        const usedCoupon=await this.Prisma.user_coupon.findFirst({
            where : {
                userId : user.id,
                couponId:coupon.id
            }
        })
        if ( usedCoupon ){
            throw new HttpException("you have already used coupon",400);
        };
        const price=order.price - ( coupon.discount / 100 )*order.price;
        let orderUpdated=await this.Prisma.order.update({ 
            where : {id : order.id },
            data : {
                price
            },
            include : { items : true }
        });
        await this.Prisma.user_coupon.create({ 
            data : {
                couponId : coupon.id,
                userId:user.id
            }
        });
        return { order:orderUpdated };
    };
};