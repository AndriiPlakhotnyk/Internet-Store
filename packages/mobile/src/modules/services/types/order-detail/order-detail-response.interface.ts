export interface OrderDetailResponse {
	orderDetailId: string;
	quantity: number;
	priceAtPurchase: number;
	product: {
		name: string;
		description: string;
		inStock: number;
		category: string;
	};
}
