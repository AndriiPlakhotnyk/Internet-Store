import { Controller, Post, Body, Param, UseGuards, Get, Put, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from '@/decorators';
import { AccessTokenGuard, RolesGuard } from '@/modules/security/guards';
import { CreateProductDto, UpdateProductDto } from '@/dto/product';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('product/:id')
    @UseGuards(AccessTokenGuard)
    async getProduct(
        @Param('id') productId: string,
    ) {
        return this.productService.getById(productId);
    }

    @Get('products')
    @UseGuards(AccessTokenGuard)
    async getProducts(
        @Query('name') name?: string,
        @Query('sortBy') sortBy?: 'asc' | 'desc',
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        return this.productService.loadAllProducts({ name, sortBy }, page, pageSize);
    }

    @Post('product')
    @Roles('ADMIN')
    @UseGuards(AccessTokenGuard, RolesGuard)
    async makeProduct(
        @Body() createProductDto: CreateProductDto,
    ) {
        return this.productService.createProduct(createProductDto);
    }

    @Put('product/:id')
    @Roles('ADMIN')
    @UseGuards(AccessTokenGuard, RolesGuard)
    async editProduct(
        @Param('id') productId: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productService.updateProduct(productId, updateProductDto);
    }

    @Delete('product/:id')
    @Roles('ADMIN')
    @UseGuards(AccessTokenGuard, RolesGuard)
    async deletProduct(
        @Param('id') productId: string
    ) {
        return this.productService.removeProduct(productId);
    }


}
