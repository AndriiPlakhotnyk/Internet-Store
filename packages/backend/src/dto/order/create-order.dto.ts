import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  totalAmount: number;
}
