import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";



@Module({ 
    controllers:[OrderController]
    ,providers:[OrderService],
    imports:[PrismaModule],
    exports:[OrderService]
})
export class OrderModule {};