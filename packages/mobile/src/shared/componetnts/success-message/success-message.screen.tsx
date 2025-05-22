import React from 'react';
import { View, Text, Image } from 'react-native';
import { CustomButton } from 'src/shared/componetnts/button';
import { SuccessMessageProps } from './success-message.interface';
import { successMessageStyled } from './success-message.styles';
import { Layout } from '../layout';

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
	message,
	buttonText,
	onButtonPress,
	iconButton,
}) => {
	return (
		<Layout>
			<View style={successMessageStyled.containerIcon}>
				<Image
					source={require('assets/images/success-image.png')}
					style={successMessageStyled.checkIcon}
				/>
				<View style={successMessageStyled.messageContainer}>
					<Text
						style={successMessageStyled.message}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{message}
					</Text>
				</View>
			</View>
			<CustomButton
				title={buttonText}
				onPress={onButtonPress}
				iconButton={iconButton}
			/>
		</Layout>
	);
};
