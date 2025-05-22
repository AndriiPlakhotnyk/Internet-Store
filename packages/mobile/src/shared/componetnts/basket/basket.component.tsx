import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from 'src/store/cart.store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { IconComponent } from '../icons-map';
import { basketStyles } from './basket.styles';

export const CartIcon = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const cart = useCartStore((state) => state.cart);
	const cartCount = cart.length;

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(NAVIGATION_KEYS.CART)}
			style={basketStyles.container}
		>
			<IconComponent name={'basket'} />
			{cartCount > 0 && (
				<View style={basketStyles.badge}>
					<Text style={basketStyles.badgeText}>{cartCount}</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};
