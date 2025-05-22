import { View, FlatList, Text } from 'react-native';
import { Layout } from 'src/shared/componetnts/layout';
import { Header } from 'src/shared/componetnts/header';
import { useCartStore } from 'src/store/cart.store';
import { cartStyles } from './cart.styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS, RootStackParamList } from '../navigation/types';
import { DetailItem } from '../detail-item';
import { CustomButton } from 'src/shared/componetnts/button';
import { useMutation } from '@tanstack/react-query';
import { OrderDetail } from '../services/types/order';
import { AxiosError } from 'axios';
import { toastMessage } from 'src/shared/componetnts/toast';
import { orderService } from '../services/orders';

export function CartScreen() {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const { cart, removeFromCart, clearCart } = useCartStore();
	const totalAmount = cart.reduce(
		(sum, item) => sum + item.price * item.amount,
		0,
	);

	const handleProductPress = (productId: string) => {
		navigation.navigate(NAVIGATION_KEYS.EDIT_CART_ITEM, { productId });
	};

	const mutation = useMutation({
		mutationFn: async (orderDetails: OrderDetail[]) =>
			orderService.createOrder(orderDetails),
		onSuccess: (data) => {
			const orderId = data.orderId;
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_ORDER, { orderId });
			clearCart();
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

	const handleMakeOrder = async () => {
		const orderDetails = cart.map((item) => ({
			productId: item.id,
			quantity: item.amount,
			priceAtPurchase: item.price,
		}));
		await mutation.mutateAsync(orderDetails);
	};

	const handleDelete = (id: string) => {
		removeFromCart(id);
	};

	return (
		<Layout>
			<View style={cartStyles.container}>
				<Header text={'Cart'} />

				<Text style={cartStyles.text}>
					Total Amount: ${totalAmount}
				</Text>

				<FlatList
					data={cart}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => (
						<DetailItem
							name={item.name}
							total={item.price}
							amount={item.amount}
							onPress={() => handleProductPress(item.id)}
							onDelete={() => handleDelete(item.id)}
						/>
					)}
				/>
				<CustomButton
					title="Create Order"
					onPress={handleMakeOrder}
					disabled={totalAmount === 0}
				/>
			</View>
		</Layout>
	);
}
