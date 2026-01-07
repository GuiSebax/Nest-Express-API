import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotFoundException, ValidationException } from 'src/common/exceptions';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) { }

    async createOrder(dto: CreateOrderDto) {
        const productIds = dto.items.map((item) => item.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } }
        });

        if (products.length !== productIds.length) {
            throw new NotFoundException("Produto");
        }

        let totalPrice = 0;
        const orderItems = dto.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            if (!product) throw new NotFoundException("Produto");
            const itemTotal = product.price * item.quantity;
            totalPrice += itemTotal;

            return {
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: product.price,
            };
        });

        const order = await this.prisma.order.create({
            data: {
                userId: dto.userId,
                totalPrice,
                status: 'PENDING',
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: true,
            }
        });

        return order;
    }

    async getAllOrders() {
        return this.prisma.order.findMany({
            include: {
                items: true
            },
        });
    }

    async getOrderById(orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });

        if (!order) {
            throw new NotFoundException("Pedido");
        }

        return order;
    }

    async updateOrderStatus(orderId: number, dto: UpdateOrderStatusDto) {
        const order = await this.prisma.order.findUnique({ where: { id: orderId } });

        if (!order) {
            throw new NotFoundException("Pedido");
        }

        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: dto.status }
        });
    }

    async deleteOrder(orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            throw new NotFoundException("Pedido");
        }

        if (order.status !== 'PENDING') {
            throw new ValidationException('Apenas pedidos pendentes podem ser deletados.');
        }

        await this.prisma.orderItem.deleteMany({ where: { orderId } })

        await this.prisma.order.delete({ where: { id: orderId } })
    }

}
