import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useProductStore } from 'src/store/product.store';
import { Footer } from '../footer';
import { styles } from './products.styles';

export const ProductsScreen: React.FC = () => {
	const { products, loadProducts } = useProductStore();

	useEffect(() => {
		loadProducts();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Products</Text>
			<FlatList
				data={products}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.product}>
						<Text>{item.name}</Text>
						<Text>${item.price}</Text>
					</View>
				)}
			/>
			<Footer />
		</View>
	);
};
