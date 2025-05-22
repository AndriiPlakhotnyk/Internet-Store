import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/orm";
import { Prisma, Product } from "@prisma/client";
import { CreateProductDto, UpdateProductDto } from "@/dto/product";

@Injectable()
export class ProductService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async loadAllProducts(
        filter: { name?: string; sortBy?: 'asc' | 'desc' },
        page: number = 1,
        pageSize: number = 10,
    ) {
        const where: Prisma.ProductWhereInput = {};

        if (filter.name) {
                where.name = {
                contains: filter.name,
                mode: 'insensitive',
            };
        }

        const orderBy: Prisma.ProductOrderByWithRelationInput = {};

        if (filter.sortBy) {
            orderBy.price = filter.sortBy;
        }

        const parsedPage = Number(page);
        const parsedPageSize = Number(pageSize);
        const products = await this.prismaService.product.findMany({
            where,
            orderBy,
            skip: (parsedPage - 1) * parsedPageSize,
            take: parsedPageSize,
        });

        const total = await this.prismaService.product.count({
            where,
        });

        return {
            products,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async getById(id: string): Promise<Product> {
        const product = await this.prismaService.product.findUnique({
            where: {
                id,
            },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        return product;
    }

    async createProduct(createProductDto: CreateProductDto): Promise<void> {
        const { name, description, inStock, price, category } = createProductDto;
        await this.prismaService.product.create({
            data: {
                name,
                description,
                inStock,
                price,
                category,
            },
        });
    }

    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const { name, description, inStock, price, category } = updateProductDto;
        return await this.prismaService.product.update({
            where: { id },
            data: {
                name,
                description,
                inStock,
                price,
                category,
            },
        });
    }

    async removeProduct(id: string): Promise<void> {
        await this.prismaService.product.delete({
            where: { id },
        });
    }
}
