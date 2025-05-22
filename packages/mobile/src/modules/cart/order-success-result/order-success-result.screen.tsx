import React from 'react';
import { SuccessMessage } from 'src/shared/componetnts/success-message';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

export const SuccessOrderScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.SUCCESS_ORDER>
		>();
	const orderId = route.params?.orderId;
	const handleButton = () => {
		navigation.navigate(NAVIGATION_KEYS.ORDER_DETAILS, { orderId });
	};
	return (
		<SuccessMessage
			message={'Order created successfully!'}
			buttonText={'Order Details'}
			onButtonPress={handleButton}
		/>
	);
};
