export interface OrderItemProps {
	date: string;
	orderId: string;
	paymentStatus: string;
	deliveryStatus: string;
	total: number;
	onPress: () => void;
	onDelete: () => void;
}
