import { IsUUID, IsNumber, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  orderId: string;

  @IsNumber()
  @Min(0)
  totalAmount: number;
}
