import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("users")
export class UserController {
    constructor(
        private userService:UserService
    ){};
    @Post("login")
    login(@Body() body:LoginDto ){
        return this.userService.login(body);
    }
    @Post("signup")
    signup(@Body() body:SignupDto){
        return this.userService.signup(body);
    }
    @Get(":userId/orders")
    getOrders(
        @Param("userId",ParseIntPipe) userId:number
    ){
        return this.userService.getUserOrders(userId);
    }
};