import { IsEnum, IsOptional, IsString, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';
import { PaymentStatus } from '@prisma/client';

export class UpdateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;
  
    @IsEnum(PaymentStatus)
    paymentStatus: PaymentStatus;
  
    @IsNumber()
    totalAmount: number;
}
