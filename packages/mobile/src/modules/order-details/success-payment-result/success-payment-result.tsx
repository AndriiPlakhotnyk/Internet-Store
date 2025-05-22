import React from 'react';
import { SuccessMessage } from 'src/shared/componetnts/success-message';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { IconComponent } from 'src/shared/componetnts/icons-map';

export const SuccessPaymentScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const handleButton = () => {
		navigation.navigate(NAVIGATION_KEYS.TABS, {
			screen: NAVIGATION_KEYS.ORDERS,
		});
	};
	return (
		<SuccessMessage
			message={'Payment successfully!'}
			buttonText={'Ok'}
			onButtonPress={handleButton}
			iconButton={<IconComponent name={'checkMarkCircle'} />}
		/>
	);
};
