import { IsEnum } from "class-validator";

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export class UpdateOrderStatusDto {

    @IsEnum(OrderStatus, { message: 'Status inválido' })
    status: OrderStatus
}