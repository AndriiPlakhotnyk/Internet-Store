import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { layoutStyles } from './layout.styles';

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return <View style={layoutStyles.container}>{children}</View>;
};
