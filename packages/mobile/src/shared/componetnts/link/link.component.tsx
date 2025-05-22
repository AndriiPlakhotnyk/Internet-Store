import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { linkStyles } from './link.styles';

type LinkTextProps = {
	label: string;
	linkText: string;
	onPress: () => void;
};

export const LinkText: React.FC<LinkTextProps> = ({
	label,
	linkText,
	onPress,
}) => {
	return (
		<View style={linkStyles.footer}>
			<Text style={linkStyles.footerText}>{label}</Text>
			<TouchableOpacity onPress={onPress}>
				<Text style={linkStyles.footerLinkText}> {linkText}</Text>
			</TouchableOpacity>
		</View>
	);
};
