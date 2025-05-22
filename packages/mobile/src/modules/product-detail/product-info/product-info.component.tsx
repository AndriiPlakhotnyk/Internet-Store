import React from 'react';
import { View } from 'react-native';
import { productInfoStyles } from './product-info.styles';
import { ProductDetailsProps } from './product-info.interface';
import { Label } from 'src/shared/componetnts/label';

export const ProductInfo = ({
	name,
	description,
	inStock,
	price,
	category,
}: ProductDetailsProps) => {
	return (
		<View style={productInfoStyles.container}>
			<Label title="Name:" value={name} />
			<Label title="Description:" value={description} />
			<Label title="In Stock:" value={inStock} />
			<Label title="Price:" value={`$${price}`} />
			<Label title="Category:" value={category} />
			<Label title="Amount" />
		</View>
	);
};
