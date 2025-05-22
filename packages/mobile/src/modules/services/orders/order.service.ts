import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import {
	MakeOrderWithDetailsResponse,
	Order,
	OrderDeleteResponse,
	OrderDetail,
} from '../types/order';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';

class OrderService {
	constructor(
		private readonly authHttpService: EnhancedWithAuthHttpService,
	) {}

	async getOrders(): Promise<Order[]> {
		try {
			const orders = this.authHttpService.get<Order[]>('order/orders');
			return orders;
		} catch (error) {
			console.error('Error to load orders', error);
			throw error;
		}
	}

	async getOrderById(orderId: string): Promise<Order> {
		try {
			const order = this.authHttpService.get<Order>(`order/${orderId}`);
			return order;
		} catch (error) {
			console.error('Error to load order', error);
			throw error;
		}
	}

	async createOrder(
		data: OrderDetail[],
	): Promise<MakeOrderWithDetailsResponse> {
		try {
			const order = this.authHttpService.post<
				MakeOrderWithDetailsResponse,
				OrderDetail[]
			>('order', data);
			return order;
		} catch (error) {
			console.error('Error to make order', error);
			throw error;
		}
	}

	async deleteOrder(orderId: string): Promise<OrderDeleteResponse> {
		try {
			return this.authHttpService.delete<Order>(`order/${orderId}`);
		} catch (error) {
			console.error('Error to delete order', error);
			throw error;
		}
	}
}

export const orderService = new OrderService(
	new HttpFactoryService().createAuthHttpService(),
);
