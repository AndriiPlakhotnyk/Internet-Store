import { IsUUID, IsNotEmpty, IsInt, Min, IsNumber } from 'class-validator';

export class CreateOrderDetailDto {
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  priceAtPurchase: number;
}
