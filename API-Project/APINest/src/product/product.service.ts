import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException } from 'src/common/exceptions';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async findAllProducts() {
        return this.prisma.product.findMany({
            include: {
                images: true,
                categories: true,
            }
        });
    }

    async findProductById(productId: number) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                images: true,
                categories: true,
                orderItems: {
                    include: { order: true }
                }
            }
        });

        if (!product) {
            throw new NotFoundException("Produto");
        }

        return product;
    }

    async createProduct(dto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                name: dto.name,
                price: dto.price,
                description: dto.description || null
            }
        });
    }

    async updateProduct(productId: number, dto: UpdateProductDto) {

        const existing = await this.prisma.product.findUnique({
            where: { id: productId }
        });

        const data: any = {};

        if (!existing) {
            throw new NotFoundException("Produto");
        }

        if (dto.name !== undefined) {
            data.name = dto.name;
        }

        if (dto.price !== undefined) {
            data.price = dto.price;
        }

        if (dto.description !== undefined) {
            data.description = dto.description;
        }

        return this.prisma.product.update({
            where: { id: productId },
            data
        });
    }

    async deleteProduct(productId: number) {
        const existing = await this.prisma.product.findUnique({
            where: { id: productId },
        });

        if (!existing) {
            throw new NotFoundException("Produto");
        }

        return this.prisma.product.delete({
            where: { id: productId }
        })
    }
}
