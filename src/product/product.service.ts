import {  Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/product.create.dto";

@Injectable()
export class ProductService {
    constructor(private prisma:PrismaService ){};
    async createProd( body:CreateProductDto ){
        const product=await this.prisma.product.create({
            data: body
        });
        return { product };
    };
};