import { UpdatePaymentStatusDto } from "@/dto/payment";
import { CreatePaymentDto } from "@/dto/payment/create-payment.dto";
import { getRandomDeliveryStatus, getRandomPaymentStatus } from "@/helpers";
import { PrismaService } from "@/orm";
import { Injectable } from "@nestjs/common";
import { DeliveryStatus } from "@prisma/client";

@Injectable()
export class PaymentService {
    constructor(private readonly prisma: PrismaService) {}

    async payOrder(dto: CreatePaymentDto) {
        const paymentStatus = getRandomPaymentStatus();
        await this.prisma.payment.create({
            data: {
                orderId: dto.orderId,
                totalAmount: dto.totalAmount,
                paymentStatus,
            }
        });
        await this.prisma.order.update({
            where: {
                orderId: dto.orderId
            },
            data: {
                paymentStatus,
                deliveryStatus: DeliveryStatus.IN_TRANSIT,
            }
        })
    }

    async updatePaymentStatus(dto: UpdatePaymentStatusDto) {
        await this.prisma.payment.update({
            where: {
                paymentId: dto.paymentId,
            },
            data: {
                paymentStatus: dto.paymentStatus
            }
        });

        await this.prisma.order.update({
            where: {
                orderId: dto.orderId,
            },
            data: {
                paymentStatus: dto.paymentStatus,
            }
        })
    }
}