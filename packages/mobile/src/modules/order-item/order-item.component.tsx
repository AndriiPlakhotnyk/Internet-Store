import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { OrderField } from './order-item-field';
import { OrderItemProps } from './order-item.interface';
import { orderItem } from './order-item.styles';

export const OrderItem: React.FC<OrderItemProps> = ({
	date,
	orderId,
	paymentStatus,
	deliveryStatus,
	total,
	onPress,
	onDelete,
}) => {
	return (
		<Pressable onPress={onPress}>
			<View style={orderItem.container}>
				<Pressable
					style={styles.cross}
					onPress={(e) => {
						e.stopPropagation();
						onDelete();
					}}
				>
					<Text style={styles.crossText}>×</Text>
				</Pressable>
				<OrderField title={'Date: '} value={date} />
				<OrderField title={'ID: '} value={orderId} />
				<OrderField title={'Payment Status: '} value={paymentStatus} />
				<OrderField
					title={'Delivery Status: '}
					value={deliveryStatus}
				/>
				<OrderField title={'Total: '} value={`$${total}`} />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	cross: {
		position: 'absolute',
		right: 8,
		top: 8,
		zIndex: 10,
		paddingHorizontal: 6,
		paddingVertical: 2,
		backgroundColor: '#ddd',
		borderRadius: 8,
	},
	crossText: {
		fontSize: 16,
		color: 'black',
		fontWeight: 'bold',
	},
});
