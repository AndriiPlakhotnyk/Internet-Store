import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { footerStyles } from './products-footer.styles';
import { COLORS } from 'src/shared/styles';
import { IconsMap } from 'src/shared/componetnts/icons-map';
import { SvgProps } from 'react-native-svg';

interface CustomTabBarProps extends BottomTabBarProps {}

const ICONS: Record<string, React.FC<SvgProps>> = {
	Products: IconsMap.productsTab,
	Orders: IconsMap.ordersTab,
	Settings: IconsMap.settingsTab,
};

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	return (
		<View style={footerStyles.footer}>
			{state.routes.map(
				(route: (typeof state.routes)[number], index: number) => {
					const { options } = descriptors[route.key];
					const label = options.title || route.name;
					const isFocused = state.index === index;
					const Icon = ICONS[route.name];
					const iconColor = isFocused ? COLORS.primary : COLORS.black;

					return (
						<TouchableOpacity
							key={route.key}
							onPress={() => navigation.navigate(route.name)}
							style={footerStyles.tabItem}
						>
							<Icon width={23} height={23} stroke={iconColor} />
							<Text
								style={
									isFocused
										? footerStyles.activeText
										: footerStyles.tabText
								}
							>
								{label}
							</Text>
						</TouchableOpacity>
					);
				},
			)}
		</View>
	);
};
