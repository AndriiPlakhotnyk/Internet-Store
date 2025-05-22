import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CustomInput } from 'src/shared/componetnts/input';
import { headerStyles } from './products.styles';

interface ProductsHeaderProps {
	searchTerm: string;
	onSearchChange: (text: string) => void;
	onSortAsc: () => void;
	onSortDesc: () => void;
	onSortReset: () => void;
}

export const ProductsHeader = memo(
	({
		searchTerm,
		onSearchChange,
		onSortAsc,
		onSortDesc,
		onSortReset,
	}: ProductsHeaderProps) => {
		return (
			<>
				<CustomInput
					placeholder="Enter product name"
					value={searchTerm}
					onChangeText={onSearchChange}
				/>
				<View style={headerStyles.buttonPanel}>
					<TouchableOpacity onPress={onSortAsc}>
						<FontAwesome name="arrow-up" size={24} />
					</TouchableOpacity>
					<TouchableOpacity onPress={onSortDesc}>
						<FontAwesome name="arrow-down" size={24} />
					</TouchableOpacity>
					<TouchableOpacity onPress={onSortReset}>
						<FontAwesome name="times" size={24} />
					</TouchableOpacity>
				</View>
			</>
		);
	},
);
