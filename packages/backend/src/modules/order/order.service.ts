import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/orm';
import { deliveryStatusMap, paymentStatusMap } from './status-details';
import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { CreateOrderDto, UpdateOrderDto } from '@/dto/order';
import { CreateDetailForOrderDto } from '@/dto/order-detail';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createOrder(dto: CreateOrderDto) {
        return this.prisma.order.create({
            data: {
                userId: dto.userId,
                totalAmount: dto.totalAmount,
            },
        });
    }

    async createOrderWithDetails(dto: CreateDetailForOrderDto[], userId: string) {
		if (!dto || dto.length === 0) {
			throw new BadRequestException('Order must contain at least one product');
		}

		return this.prisma.$transaction(async (tx) => {
			const order = await tx.order.create({
				data: { userId },
			});

			for (const detail of dto) {
				const product = await tx.product.findUnique({
					where: { id: detail.productId },
				});

				if (!product) {
					throw new BadRequestException(`Product ${detail.productId} not found`);
				}

				if (product.inStock < detail.quantity) {
					throw new BadRequestException(
						`Not enough stock for "${product.name}". Available: ${product.inStock}`,
					);
				}

				await tx.product.update({
					where: { id: detail.productId },
					data: {
						inStock: product.inStock - detail.quantity,
					},
				});
			}

			const orderDetailsData = dto.map((detail) => ({
				orderId: order.orderId,
				productId: detail.productId,
				quantity: detail.quantity,
				priceAtPurchase: detail.priceAtPurchase,
			}));

			await tx.orderDetail.createMany({
				data: orderDetailsData,
			});

            const totalAmount = orderDetailsData.reduce((sum, detail) => {
                return sum + detail.quantity * detail.priceAtPurchase;
            }, 0);
            await tx.order.update({
                where: {
                    orderId: order.orderId
                },
                data: {
                    totalAmount
                }
            });

			return {
				message: 'Order created successfully',
				orderId: order.orderId,
			};
		});
	}

    async getAllOrders(
        paymentStatus?: 'Pending' | 'Complete' | 'Failed',
        deliveryStatus?: 'Pending' | 'InTransit' | 'Delivered',
        dateSort: 'asc' | 'desc' = 'desc',
    ) {
        return this.prisma.order.findMany({
            where: {
                ...(paymentStatus
                  ? { paymentStatus: paymentStatusMap[paymentStatus] as PaymentStatus }
                  : {}),
                ...(deliveryStatus
                  ? { deliveryStatus: deliveryStatusMap[deliveryStatus] as DeliveryStatus }
                  : {}),
            },
            orderBy: {
                createdAt: dateSort,
            },
        });
    }
      

    async getOrderById(orderId: string) {
        return this.prisma.order.findUnique({
            where: { orderId },
        });
    }

    async updateOrder(orderId: string, dto: UpdateOrderDto) {
        return this.prisma.order.update({
            where: { orderId },
            data: {
            userId: dto.userId,
            totalAmount: dto.totalAmount,
            paymentStatus: dto.paymentStatus,
        },
    });
  }

    async deleteOrder(orderId: string): Promise<{ orderId: string }> {
        const order = await this.prisma.order.findUnique({
            where: { orderId },
            include: { orderDetails: true },
        });
  
        if (!order) {
            throw new Error('Order not found');
        }
  
        if (order.paymentStatus !== PaymentStatus.COMPLETE) {
            await Promise.all(order.orderDetails.map(async (detail) => {
                await this.prisma.product.update({
                    where: { id: detail.productId },
                    data: {
                        inStock: {
                            increment: detail.quantity,
                        },
                    },
                });
            }));
        }
  
        await this.prisma.orderDetail.deleteMany({
            where: { orderId },
        });
  
        await this.prisma.payment.deleteMany({
            where: { orderId },
        });
  
        await this.prisma.order.delete({
            where: { orderId },
        });

        return {orderId: order.orderId};
    }
}
