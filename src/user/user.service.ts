import { HttpException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrybtjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { userType } from "@prisma/client";
import { OrderService } from "src/order/order.service";

export interface UserInterface {
    id:number;
    name: string;
    email: string;
    password: string;
    role: userType;
};


@Injectable()
export class UserService {
    constructor(
        private prisma:PrismaService,
        private configService:ConfigService,
        private orderSrv:OrderService
    ){};
    async signup(body:SignupDto){
        const userExist=await this.prisma.user.findUnique({
            where : {
                email : body.email
            }
        });
        if( userExist ){
            throw new HttpException("email is used by another user",400)
        };
        body.password=await bcrybtjs.hash(body.password,10);
        const user=await this.prisma.user.create({ data : body });
        const token=this.createToken(user.id);
        return { user , token };
    };
    async login(body:LoginDto){
        const userExist=await this.prisma.user.findUnique({
            where : {
                email : body.email
            }
        });
        if( !userExist ){
            throw new HttpException("user not found",400)
        };
        const match=await bcrybtjs.compare(body.password,userExist.password);
        if(!match){
            throw new HttpException("email or password is not correct",400)
        };
        const token=this.createToken(userExist.id);
        return { user:userExist , token };
    };
    getUserOrders( userId:number ){
        return this.orderSrv.getOrders(userId);
    };
    private createToken(id:number){
        const token=jwt
        .sign({ userId:id },this.configService.get("jwt_secret"),{expiresIn:"7d"});
        return token;
    }
};