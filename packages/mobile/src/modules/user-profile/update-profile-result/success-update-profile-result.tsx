import React from 'react';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { SuccessMessage } from 'src/shared/componetnts/success-message';

export const SuccessUpdateProfileScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const handleButton = () => {
		navigation.navigate(NAVIGATION_KEYS.TABS, {
			screen: NAVIGATION_KEYS.SETTINGS,
		});
	};
	return (
		<SuccessMessage
			message={'Profile updated successfully!'}
			buttonText={'Save'}
			onButtonPress={handleButton}
		/>
	);
};
