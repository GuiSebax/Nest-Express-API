import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {

    constructor(private readonly service: CategoryService) { }

    @Get()
    findAllCategoriesHandles() {
        return this.service.findAllCategories();
    }

    @Get(':id')
    findCategoryByIdHandler(@Param('id', ParseIntPipe) categoryId: number) {
        return this.service.findCategoryById(categoryId);
    }

    @Post()
    createCategoryHandler(@Body() dto: CreateCategoryDto) {
        return this.service.createCategory(dto);
    }

    @Patch(':id')
    updateCategoryHandler(@Param('id', ParseIntPipe) categoryId: number, dto: UpdateCategoryDto) {
        return this.service.updateCategory(categoryId, dto);
    }

    @Delete(':id')
    deleteCategoryHandler(@Param('id', ParseIntPipe) categoryId: number) {
        return this.service.deleteCategory(categoryId);
    }




}
