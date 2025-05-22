import { View, Text, Pressable } from 'react-native';
import { ProductItemProps } from './product.interface';
import { productStyles } from './product.styles';

export const ProductItem: React.FC<ProductItemProps> = ({
	name,
	category,
	price,
	onPress,
}) => {
	return (
		<Pressable onPress={onPress}>
			<View style={productStyles.productItem}>
				<View style={productStyles.productDetails}>
					<Text style={productStyles.productName}>{name}</Text>
					<Text>
						<Text style={productStyles.label}>Category: </Text>
						<Text style={productStyles.value}>{category}</Text>
					</Text>
				</View>
				<Text style={productStyles.label}>
					Price: <Text style={productStyles.value}>${price}</Text>
				</Text>
			</View>
		</Pressable>
	);
};
