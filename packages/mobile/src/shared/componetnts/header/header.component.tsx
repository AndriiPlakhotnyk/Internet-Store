import React from 'react';
import { View, Text } from 'react-native';
import { headerStyles } from './header.styles';
import { BackArrowIcon } from '../back-arrow';

interface HeaderProps {
	arrowBack?: boolean;
	text: string;
	extraComponent?: React.ReactNode;
	onPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
	arrowBack = true,
	text,
	extraComponent,
	onPress,
}) => {
	return (
		<View style={headerStyles.container}>
			<View style={headerStyles.leftContainer}>
				{arrowBack && <BackArrowIcon onPress={onPress} />}
			</View>

			<View style={headerStyles.centerContainer}>
				<Text style={headerStyles.title}>{text}</Text>
			</View>

			<View style={headerStyles.rightContainer}>{extraComponent}</View>
		</View>
	);
};
