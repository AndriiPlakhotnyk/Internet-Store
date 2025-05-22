import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAvoidingLayoutProps } from './scroll.interface';
import { keyboardStyles } from './scroll.styles';

export const KeyboardAvoidingLayout: React.FC<KeyboardAvoidingLayoutProps> = ({
	children,
	contentContainerStyle,
	style,
}) => {
	return (
		<KeyboardAwareScrollView
			contentContainerStyle={[
				keyboardStyles.contentContainer,
				contentContainerStyle,
			]}
			style={[keyboardStyles.container, style]}
			extraHeight={Platform.OS === 'ios' ? 120 : 100}
			enableOnAndroid={true}
			keyboardShouldPersistTaps="handled"
			extraScrollHeight={Platform.OS === 'ios' ? 50 : 0}
			showsVerticalScrollIndicator={false}
		>
			{children}
		</KeyboardAwareScrollView>
	);
};
