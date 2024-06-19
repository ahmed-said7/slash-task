import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { addProductDto } from "./dto/add.prod.dto";
import { UserInterface } from "src/user/user.service";
import { updateProductQuantityDto } from "./dto/update.prod.dto";
import { deleteProductDto } from "./dto/delete.prod.dto";

@Injectable()
export class CartService {
    constructor(private prisma:PrismaService){};
    async addProduct(body:addProductDto,user:UserInterface){
        let cart=await this.prisma.cart
            .findFirst({ where : { userId : user.id }  });
        const product=await this.prisma.product
            .findUnique({ where : { id:body.productId } });
        if(! product ){
            throw new HttpException("product not found",400);
        };
        if( cart ){
            const item=await this.prisma.cart_items.findFirst({
                where: { productId : body.productId , cartId:cart.id }
            });
            if( item ){
                cart=await this.prisma.cart.update({ where : { id:cart.id } , data : {
                    price: cart.price +  product.price,
                    items : {
                            update : {
                                where : { id : item.id } , 
                                data : {
                                    quantity : {
                                        increment : 1
                                    }
                                }
                            }
                    }
                    }
                });
                return { cart , status : "product quantity incremented" }
            };
            cart=await this.prisma.cart.update({ where : { id:cart.id } , data : {
                price: cart.price +  product.price,
                items : {
                        create : {
                            productId : body.productId ,
                            quantity:1
                        }
                }
                }
            });
        }else {
            cart=await this.prisma.cart.create({ data : { 
                userId: user.id,
                price: product.price ,
                items : {
                    create: {
                        productId : body.productId ,
                        quantity:1
                    }
                }
            } 
            })
        };
        return { cart , status : "item added" };
    };
    async deleteItemFromCart(body:deleteProductDto,user:UserInterface){
        let cart=await this.prisma.cart
            .findFirst({ 
                where : { userId : user.id } ,
                include : { items:true } });
        if(! cart ){
            throw new HttpException("cart not found",400);
        };
        const item=await this.prisma.cart_items.findFirst({
            where : { id : body.recordId },
            include : { product : true }
        });
        if( ! item ){
            throw new HttpException("item not found",400);
        };
        const price = cart.price - item.quantity*item.product.price
        cart=await this.prisma.cart.update({ 
            where : {id : cart.id },
            data : {
                price,
                items : {
                    delete : { id : body.recordId }
                }
            },
            include : { items : true }
        });
        return { cart };
    };
    async updateItemQuantity(body:updateProductQuantityDto,user:UserInterface){
        let cart=await this.prisma.cart
            .findFirst({ where : { userId : user.id } });
        if(! cart ){
            throw new HttpException("cart not found",400);
        };
        const item=await this.prisma.cart_items.findFirst({
            where : { id : body.recordId },
            include : { product : true }
        });
        if( ! item ){
            throw new HttpException("item not found",400);
        };
        const price = cart.price - item.quantity*item.product.price + body.quantity*item.product.price 
        cart=await this.prisma.cart.update({ 
            where : {id : cart.id },
            data : {
                price,
                items : {
                    update : {
                        where : { id : body.recordId }
                        ,data : { quantity : body.quantity }
                    }
                }
            },
            include : { items : true }
        });
        return { cart };
    };
    async getUserCart(userId:number){
        let cart=await this.prisma.cart
            .findFirst({ 
                where : { userId  } , 
                include : {items: { include : {product :true} } }
            });
        if(! cart ){
            throw new HttpException("cart not found",400);
        };
        return { cart};
    };
};