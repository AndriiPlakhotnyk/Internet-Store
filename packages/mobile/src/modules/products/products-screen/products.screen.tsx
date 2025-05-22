import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useDebounceEffect } from '../hooks/useDebounceEffect';
import { AxiosError } from 'axios';
import { useProductStore } from 'src/store/product.store';
import { Loader } from 'src/shared/componetnts/loader';
import { ProductsHeader } from '../products-header';
import { ProductItem } from '../product-item/product.component';
import { Layout } from 'src/shared/componetnts/layout';
import { productsScreenStyles } from './products.styles';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmptyScreen } from '../../../shared/componetnts/empty-screen';
import { Header } from 'src/shared/componetnts/header';
import { CartIcon } from 'src/shared/componetnts/basket';
import { productService } from 'src/modules/services/product';

export function ProductsScreen() {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const {
		searchTerm,
		sortOrder,
		page,
		setPage,
		products,
		totalPages,
		setProducts,
		setSearchTerm,
		setTotalPages,
	} = useProductStore();

	const mutation = useMutation({
		mutationFn: async () =>
			productService.loadProducts({
				page,
				pageSize: 10,
				name: searchTerm || undefined,
				sortBy: sortOrder,
			}),
		onSuccess: (data) => {
			setProducts(data.products, page === 1);
			setTotalPages(data.totalPages);
			setIsRefreshing(false);
			setIsFetchingNextPage(false);
		},
		onError: (err: AxiosError) => {
			console.error('Failed to fetch products', err.message);
			setIsRefreshing(false);
			setIsFetchingNextPage(false);
		},
	});

	const fetchProducts = useCallback(() => {
		if (page > totalPages) return;
		mutation.mutateAsync();
	}, [page, searchTerm, sortOrder]);

	useDebounceEffect(
		() => {
			setPage(1);
			fetchProducts();
		},
		[searchTerm],
		500,
	);

	useEffect(() => {
		fetchProducts();
	}, [page, sortOrder]);

	const handleLoadMore = () => {
		if (!isFetchingNextPage && page < totalPages) {
			setIsFetchingNextPage(true);
			setPage(page + 1);
		}
	};

	const handleRefresh = () => {
		setIsRefreshing(true);
		setPage(1);
	};

	const handleSearchChange = (text: string) => {
		setSearchTerm(text);
	};

	const setSortOrder = useProductStore((state) => state.setSortOrder);

	const handleSort = (order?: 'asc' | 'desc') => {
		setSortOrder(order);
		setPage(1);
	};

	const handleProductPress = (productId: string) => {
		navigation.navigate(NAVIGATION_KEYS.PRODUCT_DETAILS, { productId });
	};

	return (
		<Layout>
			<View style={productsScreenStyles.container}>
				<Header
					arrowBack={false}
					text={'Products'}
					extraComponent={<CartIcon />}
				/>
				<ProductsHeader
					searchTerm={searchTerm}
					onSearchChange={handleSearchChange}
					onSortAsc={() => handleSort('asc')}
					onSortDesc={() => handleSort('desc')}
					onSortReset={() => handleSort(undefined)}
				/>

				<FlatList
					data={products}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ProductItem
							name={item.name}
							category={item.category}
							price={item.price}
							onPress={() => handleProductPress(item.id)}
						/>
					)}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					refreshControl={
						<RefreshControl
							refreshing={isRefreshing}
							onRefresh={handleRefresh}
						/>
					}
					ListEmptyComponent={
						!mutation.isPending ? (
							<EmptyScreen text={'No products found'} />
						) : null
					}
					ListFooterComponent={isFetchingNextPage ? <Loader /> : null}
				/>
			</View>
		</Layout>
	);
}
