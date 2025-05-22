import { View, FlatList, Text } from 'react-native';
import { Layout } from 'src/shared/componetnts/layout';
import { Header } from 'src/shared/componetnts/header';
import { orderDetailsStyles } from './order-details.styles';
import {
	RouteProp,
	useFocusEffect,
	useNavigation,
	useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS, RootStackParamList } from '../navigation/types';
import { DetailItem } from '../detail-item';
import { CustomButton } from 'src/shared/componetnts/button';
import { orderDetailsService } from '../services/orders/order-details.service';
import { useCallback, useState } from 'react';
import { OrderDetailsResponse } from '../services/types/order-details';
import { AxiosError } from 'axios';
import { toastMessage } from 'src/shared/componetnts/toast';
import { useMutation } from '@tanstack/react-query';
import { Order } from '../services/types/order';
import { CreatePaymentRequest } from '../services/types/payment';
import { paymentService } from '../services/payment/payment.service';
import { IconComponent } from 'src/shared/componetnts/icons-map';
import { orderService } from '../services/orders';

export function OrderDetailsScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.ORDER_DETAILS>
		>();
	const [orderDetails, setOrderDetails] = useState<
		OrderDetailsResponse[] | undefined
	>();
	const { orderId } = route.params;

	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [paymentStatus, setPaymentStatus] = useState<
		'COMPLETE' | 'FAILED' | 'PENDING'
	>('PENDING');
	const handleProductPress = (orderDetailId: string) => {
		navigation.navigate(NAVIGATION_KEYS.ORDER_DETAIL, {
			orderDetailId,
			paymentStatus,
		});
	};

	const mutationTotalAmount = useMutation({
		mutationFn: async (orderId: string) =>
			orderService.getOrderById(orderId),
		onSuccess: (data: Order) => {
			setTotalAmount(data.totalAmount);
			setPaymentStatus(data.paymentStatus);
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;

			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const mutationOrderDetails = useMutation({
		mutationFn: async (orderId: string) =>
			orderDetailsService.getOrderDetails(orderId),
		onSuccess: (data: OrderDetailsResponse[]) => {
			setOrderDetails(data);
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;
			console.log(errorMessage);

			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (orderDetailId: string) =>
			orderDetailsService.deleteOrderDetail(orderDetailId),
		onSuccess: async (orderId: string) => {
			await getTotalAmount(orderId);
			await loadOrderDetails(orderId);
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;
			console.log(errorMessage);

			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const paymentMutation = useMutation({
		mutationFn: async (data: CreatePaymentRequest) =>
			paymentService.payOrder(data),
		onSuccess: () => {
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_PAYMENT);
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;
			console.log(errorMessage);

			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const handlePay = async () => {
		return paymentMutation.mutateAsync({ orderId, totalAmount });
	};

	const loadOrderDetails = async (orderId: string) => {
		return mutationOrderDetails.mutateAsync(orderId);
	};

	const getTotalAmount = async (orderId: string) => {
		return mutationTotalAmount.mutateAsync(orderId);
	};

	const handleDelete = async (orderDetailId: string) => {
		return deleteMutation.mutateAsync(orderDetailId);
	};

	useFocusEffect(
		useCallback(() => {
			getTotalAmount(orderId);
			loadOrderDetails(orderId);
		}, []),
	);

	return (
		<Layout>
			<View style={orderDetailsStyles.container}>
				<Header
					text={'Order Details'}
					onPress={() =>
						navigation.navigate(NAVIGATION_KEYS.TABS, {
							screen: NAVIGATION_KEYS.ORDERS,
						})
					}
				/>

				<Text style={orderDetailsStyles.text}>
					Total Amount: ${totalAmount}
				</Text>

				<FlatList
					data={orderDetails}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.orderDetailId}
					renderItem={({ item }) => (
						<DetailItem
							name={item.product.name}
							total={item.priceAtPurchase}
							amount={item.quantity}
							onPress={() =>
								handleProductPress(item.orderDetailId)
							}
							onDelete={
								paymentStatus !== 'COMPLETE'
									? () => handleDelete(item.orderDetailId)
									: undefined
							}
						/>
					)}
				/>
				{paymentStatus !== 'COMPLETE' && (
					<CustomButton
						title="Pay"
						onPress={() => handlePay()}
						disabled={totalAmount === 0}
						iconButton={<IconComponent name={'card'} />}
					/>
				)}
			</View>
		</Layout>
	);
}
