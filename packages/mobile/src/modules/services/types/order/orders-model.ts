import { OrderDetail } from './order-detail-model';

export interface Order {
	orderId: string;
	userId: string;
	totalAmount: number;
	paymentStatus: 'PENDING' | 'COMPLETE' | 'FAILED';
	deliveryStatus: 'PENDING' | 'DELIVERED' | 'IN_TRANSIT';
	createdAt: string;
	orderDetails: OrderDetail[];
}
