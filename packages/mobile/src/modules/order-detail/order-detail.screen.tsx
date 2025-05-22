import React, { useEffect, useState } from 'react';
import { CustomButton } from 'src/shared/componetnts/button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { Layout } from 'src/shared/componetnts/layout';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Loader } from 'src/shared/componetnts/loader';
import { CartIcon } from 'src/shared/componetnts/basket';
import { Header } from 'src/shared/componetnts/header';
import { ProductInfo } from '../product-detail/product-info';
import { Counter } from 'src/shared/componetnts/counter';
import { OrderDetailResponse } from '../services/types/order-detail';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { orderDetailStyles } from './order-details.styles';
import { orderDetailsService } from '../services/orders';

export const OrderDetailScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route =
		useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.ORDER_DETAIL>>();
	const { orderDetailId, paymentStatus } = route.params;
	const [orderDetail, setOrderDetail] = useState<OrderDetailResponse | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [inStock, setInStock] = useState<number>(0);
	const getOrderDetailMutation = useMutation({
		mutationFn: async (id: string) => {
			const data = await orderDetailsService.getOrderDetail(id);
			return data;
		},
		onSuccess: (data: OrderDetailResponse) => {
			setOrderDetail(data);
			setIsLoading(false);
		},
		onError: (error: AxiosError) => {
			console.error('Failed to fetch order detail:', error.message);
			setIsLoading(false);
		},
	});

	const updateQuantityMutation = useMutation({
		mutationFn: async (newQuantity: number) => {
			await orderDetailsService.updateOrderDetailQuantity({
				orderDetailId,
				newQuantity,
			});
		},
		onSuccess: async () => {
			await getOrderDetailMutation.mutateAsync(orderDetailId);
		},
		onError: (error: AxiosError) => {
			console.error('Failed to update quantity:', error.message);
		},
	});

	useEffect(() => {
		const fetchInStock = async () => {
			try {
				const data =
					await orderDetailsService.getOrderDetail(orderDetailId);
				setInStock(data.product.inStock + data.quantity);
			} catch (error) {
				console.error('Error fetching inStock:', error);
			}
		};

		fetchInStock();
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getOrderDetailMutation.mutate(orderDetailId);
	}, [orderDetailId]);

	if (isLoading || !orderDetail?.product) {
		return (
			<Layout>
				<Header text="Detail Information" />
				<Loader />
			</Layout>
		);
	}

	return (
		<Layout>
			<View style={orderDetailStyles.contentContainer}>
				<Header
					text="Detail Information"
					extraComponent={<CartIcon />}
				/>

				<ProductInfo
					name={orderDetail.product.name}
					description={orderDetail.product.description}
					inStock={orderDetail.product.inStock}
					price={orderDetail.priceAtPurchase}
					category={orderDetail.product.category}
				/>

				<Counter
					initial={orderDetail.quantity}
					max={
						paymentStatus === 'COMPLETE'
							? orderDetail.quantity
							: inStock
					}
					onChange={(value) => {
						updateQuantityMutation.mutate(value);
					}}
					disabled={paymentStatus === 'COMPLETE'}
				/>
			</View>

			{paymentStatus !== 'COMPLETE' && (
				<CustomButton
					title="Save"
					onPress={() => navigation.goBack()}
				/>
			)}
		</Layout>
	);
};
