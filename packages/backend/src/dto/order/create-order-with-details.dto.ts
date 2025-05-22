import { CreateDetailForOrderDto } from "../order-detail/order-detail.dto";

export class CreateOrderWithDetailsDto {
	orderDetails: CreateDetailForOrderDto[];
}