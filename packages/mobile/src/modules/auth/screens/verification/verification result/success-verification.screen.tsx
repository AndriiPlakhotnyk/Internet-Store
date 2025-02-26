import React from 'react';
import { SuccessMessage } from '../../../../../shared/componetnts/success-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

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
