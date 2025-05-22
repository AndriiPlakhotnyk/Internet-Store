import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { OrderItem } from '../order-item/order-item.component';
import { useMutation } from '@tanstack/react-query';
import { useOrderStore } from 'src/store/order.store';
import { AxiosError } from 'axios';
import { Layout } from 'src/shared/componetnts/layout';
import { ordersScreenStyles } from './orders.styles';
import { Loader } from 'src/shared/componetnts/loader';
import { Header } from 'src/shared/componetnts/header';
import { EmptyScreen } from 'src/shared/componetnts/empty-screen';
import { NAVIGATION_KEYS, RootStackParamList } from '../navigation/types';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartIcon } from 'src/shared/componetnts/basket';
import { orderService } from '../services/orders';

export const OrdersScreen: React.FC = () => {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { orders, setOrders } = useOrderStore();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const loadOrderMutation = useMutation({
		mutationFn: async () => orderService.getOrders(),
		onSuccess: (data) => {
			setOrders(data);
			setIsRefreshing(false);
		},
		onError: (err: AxiosError) => {
			console.error('Failed to fetch orders', err.message);
			setIsRefreshing(false);
		},
	});

	interface OrderDeleteResponse {
		orderId: string;
	}

	const deleteMutation = useMutation({
		mutationFn: async (orderId: string) =>
			orderService.deleteOrder(orderId),
		onSuccess: async (data: OrderDeleteResponse) => {
			setOrders(orders.filter((order) => order.orderId !== data.orderId));
		},
		onError: (err: AxiosError) => {
			console.error('Failed to delete order', err.message);
			setIsRefreshing(false);
		},
	});

	const loadOrders = async () => {
		setIsRefreshing(true);
		await loadOrderMutation.mutateAsync();
	};

	const handledelete = async (orderId: string) => {
		await deleteMutation.mutateAsync(orderId);
	};

	useFocusEffect(
		useCallback(() => {
			loadOrders();
		}, []),
	);

	const handleProductPress = (orderId: string) => {
		navigation.navigate(NAVIGATION_KEYS.ORDER_DETAILS, { orderId });
	};

	return (
		<Layout>
			<Header text="Orders" extraComponent={<CartIcon />} />
			<View style={ordersScreenStyles.container}>
				<FlatList
					data={orders}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.orderId}
					renderItem={({ item }) => (
						<OrderItem
							date={item.createdAt}
							orderId={item.orderId}
							paymentStatus={item.paymentStatus}
							deliveryStatus={item.deliveryStatus}
							total={item.totalAmount}
							onPress={() => handleProductPress(item.orderId)}
							onDelete={() => handledelete(item.orderId)}
						/>
					)}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={loadOrders}
						/>
					}
					ListEmptyComponent={
						!loadOrderMutation.isPending ? (
							<EmptyScreen text={'No orders found'} />
						) : null
					}
					ListFooterComponent={
						loadOrderMutation.isPending ? <Loader /> : null
					}
				/>
			</View>
		</Layout>
	);
};
