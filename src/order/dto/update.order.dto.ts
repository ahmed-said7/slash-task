import { IsEnum, IsNotEmpty } from "class-validator";

enum orderStatus {
    paid="paid",
    cancelled="cancelled"
};

export class UpdateOrderDto {
    @IsNotEmpty()
    @IsEnum(orderStatus)
    status:orderStatus;
};