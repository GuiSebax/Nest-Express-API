import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {

    constructor(private readonly service: ProductService) { }

    @Get()
    getProductsHandler() {
        return this.service.findAllProducts();
    }

    @Get(':id')
    getProductByIdHandler(@Param('id', ParseIntPipe) productId: number) {
        return this.service.findProductById(productId);
    }

    @Post()
    createProductHandler(@Body() dto: CreateProductDto) {
        return this.service.createProduct(dto);
    }

    @Patch(':id')
    updateProductHandler(@Param('id', ParseIntPipe) productId: number, @Body() dto: UpdateProductDto) {
        return this.service.updateProduct(productId, dto);
    }

    @Delete(':id')
    deleteProductHandler(@Param('id', ParseIntPipe) productId: number) {
        return this.service.deleteProduct(productId);
    }

}
