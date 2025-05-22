import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface KeyboardAvoidingLayoutProps {
	children: ReactNode;
	contentContainerStyle?: ViewStyle;
	style?: ViewStyle;
}
