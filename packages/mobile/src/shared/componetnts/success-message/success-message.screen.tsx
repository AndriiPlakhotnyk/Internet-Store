import React from 'react';
import { View, Text, Image } from 'react-native';
import { CustomButton } from 'src/shared/componetnts/button';
import { SuccessMessageProps } from './success-message.interface';
import { successMessageStyled } from './success-message.styles';

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
	message,
	buttonText,
	onButtonPress,
}) => {
	return (
		<View style={successMessageStyled.container}>
			<Image
				source={require('assets/images/success-check.png')}
				style={successMessageStyled.checkIcon}
			/>
			<Text style={successMessageStyled.message}>{message}</Text>
			<CustomButton title={buttonText} onPress={onButtonPress} />
		</View>
	);
};
