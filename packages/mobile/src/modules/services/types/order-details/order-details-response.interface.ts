export interface OrderDetailsResponse {
	orderDetailId: string;
	quantity: number;
	priceAtPurchase: number;
	product: {
		name: string;
	};
}
