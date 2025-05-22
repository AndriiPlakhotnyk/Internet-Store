import { Order } from './orders-model';

export interface LoadOrdersResponse {
	orders: Order[];
	payment: number;
	delivery: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';
	date: Date;
}
