import { Body, Controller,Post, SetMetadata, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/product.create.dto";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { AuthorizationGuard } from "src/guard/authorization.guard";
import { userType } from "@prisma/client";

@Controller("product")
export class ProductController {
    constructor(private productService:ProductService){}
    @Post()
    @UseGuards(AuthenticationGuard)
    createProduct( @Body() body: CreateProductDto ){
        return this.productService.createProd(body);
    };
};