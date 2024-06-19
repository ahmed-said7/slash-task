import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { OrderModule } from "src/order/order.module";


@Module({
    controllers:[UserController],
    providers:[UserService],
    imports:[PrismaModule,OrderModule]
})

export class UserModule {};