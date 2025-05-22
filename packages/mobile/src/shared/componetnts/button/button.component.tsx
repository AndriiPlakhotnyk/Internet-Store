import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { buttonStyles } from './button.styles';
import { CustomButtonProps } from './button.interface';

export const CustomButton: React.FC<CustomButtonProps> = ({
	title,
	onPress,
	disabled = false,
	iconButton,
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
			<View style={buttonStyles.content}>
				{iconButton && (
					<View style={buttonStyles.icon}>{iconButton}</View>
				)}
				<Text style={buttonStyles.buttonText}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};
