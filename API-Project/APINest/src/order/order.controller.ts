import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {

    constructor(private readonly service: OrderService) { }

    @Get()
    getOrdersHandler() {
        return this.service.getAllOrders();
    }

    @Get(':id')
    getOrderByIdHandler(@Param('id', ParseIntPipe) orderId: number) {
        return this.service.getOrderById(orderId);
    }

    @Post()
    createOrderHandler(@Body() dto: CreateOrderDto) {
        return this.service.createOrder(dto);
    }

    @Patch(':id')
    updateOrderStatusHandler(@Param('id', ParseIntPipe) orderId: number, @Body() dto: UpdateOrderStatusDto) {
        return this.service.updateOrderStatus(orderId, dto);
    }

    @Delete(':id')
    deleteOrderHandler(@Param('id', ParseIntPipe) orderId: number) {
        return this.service.deleteOrder(orderId);
    }

}
