import { IsEnum, IsString } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class UpdatePaymentStatusDto {
    @IsString()
    paymentId: string;

    @IsString()
    orderId: string;

    @IsEnum(PaymentStatus)
    paymentStatus: PaymentStatus;
    
}
    