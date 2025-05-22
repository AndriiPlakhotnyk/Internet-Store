import React, { useEffect, useState } from 'react';
import { Header } from '../../../shared/componetnts/header';
import { ProductInfo } from '../product-info';
import { Counter } from '../../../shared/componetnts/counter';
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
import { View } from 'react-native';
import { productDetailStyles } from './product-detail.styles';
import { productService } from 'src/modules/services/product';

export const ProductDetailScreen = () => {
	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.PRODUCT_DETAILS>
		>();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { productId } = route.params;

	const addToCart = useCartStore((state) => state.addToCart);

	const [productDetail, setProductDetail] = useState<Product | undefined>(
		undefined,
	);
	const [amount, setAmount] = useState<number>(1);

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
		}
		navigation.goBack();
	};

	return (
		<Layout>
			{productDetail ? (
				<>
					<View style={productDetailStyles.contentContainer}>
						<Header
							text="Product Information"
							extraComponent={<CartIcon />}
						/>

						<ProductInfo
							name={productDetail.name}
							description={productDetail.description}
							inStock={productDetail.inStock}
							price={productDetail.price}
							category={productDetail.category}
						/>

						<Counter
							max={productDetail.inStock}
							onChange={(value) => setAmount(value)}
						/>
					</View>

					<CustomButton
						title="Add to Cart"
						onPress={handleAddToCart}
					/>
				</>
			) : (
				<>
					<Header
						text="Product Information"
						extraComponent={<CartIcon />}
					/>
					<Loader />
				</>
			)}
		</Layout>
	);
};
