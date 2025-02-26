import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonStyles } from './button.styles';

export interface CustomButtonProps {
	title: string;
	onPress: () => void;
	disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	disabled = false,
}) => {
	return (
		<TouchableOpacity
			style={[
				buttonStyles.button,
				disabled && buttonStyles.buttonDisabled,
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={buttonStyles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};
