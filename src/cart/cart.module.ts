import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";



@Module({ 
    controllers:[CartController]
    ,providers:[CartService],
    imports:[PrismaModule]
})
export class CartModule {};