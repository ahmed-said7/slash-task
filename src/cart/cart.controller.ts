import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { CartService } from "src/cart/cart.service";
import { UserInterface } from "src/user/user.service";
import { addProductDto } from "src/cart/dto/add.prod.dto";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { AuthorizationGuard } from "src/guard/authorization.guard";
import { userType } from "@prisma/client";
import { updateProductQuantityDto } from "./dto/update.prod.dto";
import { User } from "src/decorator/user.decorator";
import { deleteProductDto } from "./dto/delete.prod.dto";

@Controller("cart")
export class CartController {
    constructor(private cartService:CartService){};
    

    @Post("add")
    @UseGuards(AuthenticationGuard)
    addProduct(@User() user:UserInterface,@Body() body:addProductDto ){
        return this.cartService.addProduct(body,user);
    };

    @Delete("remove")
    @UseGuards(AuthenticationGuard)
    deleteItem( @Body() body:deleteProductDto,@User() user:UserInterface ){
        return this.cartService.deleteItemFromCart(body,user);
    };
    
    @Put("update")
    @UseGuards(AuthenticationGuard)
    updateQuantity( @User() user:UserInterface,@Body() body:updateProductQuantityDto ){
        return this.cartService.updateItemQuantity(body,user);
    };

    @Get(":userId")
    @UseGuards(AuthenticationGuard)
    getCart( @Param("userId",ParseIntPipe) userId:number ){
        return this.cartService.getUserCart(userId);
    };
};