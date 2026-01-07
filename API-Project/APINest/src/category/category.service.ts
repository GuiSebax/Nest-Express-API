import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException, ValidationException } from 'src/common/exceptions';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {

    constructor(private readonly prisma: PrismaService) { }

    async findAllCategories() {
        return this.prisma.category.findMany();
    }

    async findCategoryById(categoryId: number) {

        const category = await this.prisma.category.findUnique({
            where: { id: categoryId },
            include: {
                products: true,
            }
        });

        if (!category) {
            throw new NotFoundException("Categoria");
        }

        return category;
    }

    async createCategory(dto: CreateCategoryDto) {
        const existingCategory = await this.prisma.category.findFirst({
            where: { name: dto.name }
        });

        if (existingCategory) {
            throw new ValidationException("Já existe uma categoria com esse nome.");
        }

        return this.prisma.category.create({
            data: {
                name: dto.name,
            }
        });
    }

    async updateCategory(categoryId: number, dto: UpdateCategoryDto) {

        const existingCategory = await this.prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!existingCategory) {
            throw new ValidationException(`Categoria com ID ${categoryId} não encontrada`);
        }

        const existingCategoryName = await this.prisma.category.findFirst({
            where: {
                name: dto.name,
                NOT: { id: categoryId }
            }
        });

        if (existingCategoryName) {
            throw new ValidationException("Já existe uma categoria com esse nome.");
        }

        const data: any = {};

        if (dto.name !== undefined) {
            data.name = dto.name
        };

        return this.prisma.category.update({
            where: { id: categoryId },
            data,
        });
    }

    async deleteCategory(categoryId: number) {
        const existingCategory = await this.prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!existingCategory) {
            throw new NotFoundException("Categoria");
        }

        const categoryHasProducts = await this.prisma.product.findFirst({
            where: {
                categories: {
                    some: { id: categoryId }
                }
            }
        });

        if (categoryHasProducts) {
            throw new ValidationException("Não é possível deletar uma categoria com produtos associados.");
        }

        return this.prisma.category.delete({
            where: { id: categoryId }
        });
    }


}
