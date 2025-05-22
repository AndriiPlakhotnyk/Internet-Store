import React from 'react';
import { SuccessMessage } from 'src/shared/componetnts/success-message';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const SuccessChangePasswordScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const handleButton = () => {
		navigation.navigate(NAVIGATION_KEYS.TABS, {
			screen: NAVIGATION_KEYS.SETTINGS,
		});
	};
	return (
		<SuccessMessage
			message={'Password changed successfully!'}
			buttonText={'Save'}
			onButtonPress={handleButton}
		/>
	);
};
