import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { OrderDetailsResponse } from '../types/order-details';
import {
	OrderDetailResponse,
	OrderQuantityRequest,
	OrderQuantityResponse,
} from '../types/order-detail';

class OrderDetailsService {
	constructor(
		private readonly authHttpService: EnhancedWithAuthHttpService,
	) {}

	async getOrderDetails(orderId: string): Promise<OrderDetailsResponse[]> {
		try {
			const orders = this.authHttpService.get<OrderDetailsResponse[]>(
				`order-details/order/${orderId}`,
			);
			return orders;
		} catch (error) {
			console.error('Error to load orders', error);
			throw error;
		}
	}

	async getOrderDetail(orderDetailId: string): Promise<OrderDetailResponse> {
		try {
			const orderDetail = this.authHttpService.get<OrderDetailResponse>(
				`order-details/${orderDetailId}`,
			);
			return orderDetail;
		} catch (error) {
			console.error('Error to load orderDetail', error);
			throw error;
		}
	}

	async updateOrderDetailQuantity({
		orderDetailId,
		newQuantity,
	}: OrderQuantityRequest): Promise<OrderQuantityResponse> {
		try {
			const newOrderQuantity = this.authHttpService.patch<
				OrderQuantityResponse,
				{ quantity: number }
			>(`order-details/${orderDetailId}`, {
				quantity: newQuantity,
			});
			return newOrderQuantity;
		} catch (error) {
			console.error('Error to load orderQuantity', error);
			throw error;
		}
	}

	async deleteOrderDetail(id: string) {
		try {
			const orderDetails = this.authHttpService.delete<{
				orderId: string;
			}>(`order-details/${id}`);
			return (await orderDetails).orderId;
		} catch (error) {
			console.error('Error to delete order detail', error);
			throw error;
		}
	}
}

export const orderDetailsService = new OrderDetailsService(
	new HttpFactoryService().createAuthHttpService(),
);
