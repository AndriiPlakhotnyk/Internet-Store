import React, { useEffect, useState } from 'react';
import { Header } from 'src/shared/componetnts/header';
import { ProductInfo } from '../product-detail/product-info';
import { Counter } from '../../shared/componetnts/counter';
import { CustomButton } from 'src/shared/componetnts/button';
import { useCartStore } from 'src/store/cart.store';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { Product } from 'src/modules/services/types/products/product-model';
import { Layout } from 'src/shared/componetnts/layout';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Loader } from 'src/shared/componetnts/loader';
import { CartIcon } from 'src/shared/componetnts/basket';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StringButton } from 'src/shared/componetnts/string-button';
import { COLORS, FONTS } from 'src/shared/styles';
import { View } from 'react-native';
import { buttonStyles } from './remove-button.styles';
import { productService } from '../services/product';

export const EditCartItemScreen = () => {
	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.PRODUCT_DETAILS>
		>();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { productId } = route.params;
	const [productDetail, setProductDetail] = useState<Product | undefined>(
		undefined,
	);

	const { addToCart, removeFromCart } = useCartStore();
	const cartItems = useCartStore((state) => state.cart);
	const existingCartItem = cartItems.find((item) => item.id === productId);
	const [amount, setAmount] = useState<number>(existingCartItem?.amount || 1);

	const mutation = useMutation({
		mutationFn: async () => {
			return await productService.getProductById(productId);
		},
		onSuccess: (data) => {
			setProductDetail(data);
		},
		onError: (err: AxiosError) => {
			console.error('Error fetching product detail:', err.message);
		},
	});

	useEffect(() => {
		mutation.mutateAsync();
	}, [productId]);

	const handleAddToCart = () => {
		if (productDetail) {
			addToCart({
				...productDetail,
				amount,
			});
			navigation.navigate(NAVIGATION_KEYS.CART);
		}
	};

	const handleRemoveItem = () => {
		removeFromCart(productId);
		navigation.navigate(NAVIGATION_KEYS.CART);
	};

	return (
		<Layout>
			<Header text={'Edit Cart Item'} extraComponent={<CartIcon />} />
			{productDetail ? (
				<>
					<ProductInfo
						name={productDetail.name}
						description={productDetail.description}
						inStock={productDetail.inStock}
						price={productDetail.price}
						category={productDetail.category}
					/>
					<Counter
						initial={amount}
						max={productDetail.inStock}
						onChange={(value) => setAmount(value)}
					/>

					<View style={buttonStyles.removeButton}>
						<StringButton
							text={'Remove from the cart'}
							color={COLORS.red}
							onPress={handleRemoveItem}
							fontFamily={FONTS.bold}
						/>
					</View>
					<CustomButton title="Save" onPress={handleAddToCart} />
				</>
			) : (
				<Loader />
			)}
		</Layout>
	);
};
