import React from 'react';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SuccessMessage } from 'src/shared/componetnts/success-message';

export const SuccessRecoverPasswordScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const handleButton = () => {
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};
	return (
		<SuccessMessage
			message={'Password successfully updated!'}
			buttonText={'Sign in'}
			onButtonPress={handleButton}
		/>
	);
};
