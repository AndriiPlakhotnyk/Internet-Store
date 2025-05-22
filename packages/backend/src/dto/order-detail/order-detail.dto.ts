import { IsUUID, IsNotEmpty, IsInt, Min, IsNumber } from 'class-validator';

export class CreateDetailForOrderDto {
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
