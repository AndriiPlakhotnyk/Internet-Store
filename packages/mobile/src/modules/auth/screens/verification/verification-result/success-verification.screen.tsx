import React from 'react';
import { SuccessMessage } from 'src/shared/componetnts/success-message';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export const SuccessVerificationScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const handleButton = () => {
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};
	return (
		<SuccessMessage
			message={'Account successfully registered!'}
			buttonText={'Sign in'}
			onButtonPress={handleButton}
		/>
	);
};
