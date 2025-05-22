import React from 'react';
import { View } from 'react-native';
import { CustomButton } from '../button';
import { authFooterStyles } from './footer.styles';
import { LinkText } from '../link';

type AuthActionsProps = {
	buttonTitle: string;
	onButtonPress: () => void;
	ableButton: boolean;
	isLoading?: boolean;

	footerLabel: string;
	footerLinkText: string;
	onFooterPress: () => void;
};

const AuthActions: React.FC<AuthActionsProps> = ({
	buttonTitle,
	onButtonPress,
	ableButton,
	isLoading = false,
	footerLabel,
	footerLinkText,
	onFooterPress,
}) => {
	return (
		<View style={authFooterStyles.container}>
			<CustomButton
				title={buttonTitle}
				onPress={onButtonPress}
				disabled={isLoading || !ableButton}
			/>

			<LinkText
				label={footerLabel}
				linkText={footerLinkText}
				onPress={onFooterPress}
			/>
		</View>
	);
};

export default AuthActions;
