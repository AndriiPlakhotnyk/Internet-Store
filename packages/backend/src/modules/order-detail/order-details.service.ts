import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/orm';
import { CreateOrderDetailDto, UpdateQuantityDetailDto } from '@/dto/order-detail';

@Injectable()
export class OrderDetailService {
    constructor(private prisma: PrismaService) {}

    async createOrderDetail(dto: CreateOrderDetailDto) {
        const orderDetail = await this.prisma.orderDetail.create({
          data: dto,
        });
    
        const orderDetails = await this.prisma.orderDetail.findMany({
            where: { orderId: dto.orderId },
        });
    
        const totalAmount = orderDetails.reduce(
            (sum, detail) => sum + detail.quantity * detail.priceAtPurchase,
            0,
        );
    
        await this.prisma.order.update({
            where: { orderId: dto.orderId },
            data: { totalAmount: totalAmount },
        });
    
        return orderDetail;
    }

    async getAllOrderDetails(orderId: string) {
        return this.prisma.orderDetail.findMany({
            where: { orderId },
            include: {
                product: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }
    
    async getOrderDetailById(orderDetailId: string) {
	return this.prisma.orderDetail.findUnique({
		where: { orderDetailId },
		include: {
			product: {
				select: {
					name: true,
					description: true,
					inStock: true,
					category: true,
				},
			},
		},
	});
}


    async updateOrderDetail(orderDetailId: string, dto: UpdateQuantityDetailDto) {
        if (dto.quantity === undefined || dto.quantity <= 0) {
            throw new Error('Quantity cannot be less than 1.');
        }
    
        return this.prisma.$transaction(async (tx) => {
            const existingOrderDetail = await tx.orderDetail.findUnique({
                where: { orderDetailId },
            });
            if (!existingOrderDetail) throw new Error('Order detail not found.');
    
            const quantityDiff = dto.quantity - existingOrderDetail.quantity;
    
            const product = await tx.product.findUnique({
                where: { id: existingOrderDetail.productId },
            });
            if (!product) throw new Error('Product not found.');
    
            if (product.inStock < quantityDiff) {
                throw new Error('Not enough items in stock.');
            }
    
            const updatedOrderDetail = await tx.orderDetail.update({
                where: { orderDetailId },
                data: dto,
            });
    
            await tx.product.update({
                where: { id: existingOrderDetail.productId },
                data: { inStock: product.inStock - quantityDiff },
            });
    
            const orderDetails = await tx.orderDetail.findMany({
                where: { orderId: updatedOrderDetail.orderId },
            });
    
            const totalAmount = orderDetails.reduce(
                (sum, detail) => sum + detail.quantity * detail.priceAtPurchase,
                0,
            );
    
            await tx.order.update({
                where: { orderId: updatedOrderDetail.orderId },
                data: { totalAmount },
            });

            return updatedOrderDetail;
        });
    }
    
    

    async deleteOrderDetail(orderDetailId: string) {
        const orderDetail = await this.prisma.orderDetail.delete({
            where: { orderDetailId },
        });
    
        const orderDetails = await this.prisma.orderDetail.findMany({
            where: { orderId: orderDetail.orderId },
        });
    
        const totalAmount = orderDetails.reduce(
            (sum, detail) => sum + detail.quantity * detail.priceAtPurchase,
            0,
        );
    
        await this.prisma.order.update({
            where: { orderId: orderDetail.orderId },
            data: { totalAmount: totalAmount },
        });
    
        return {orderId: orderDetail.orderId};
    }

    async deleteAll() {
        await this.prisma.orderDetail.deleteMany()
        await this.prisma.order.deleteMany()
    }
}
