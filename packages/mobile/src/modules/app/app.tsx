import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '../navigation/components/root-navigator';
import { ActivityIndicator, View } from 'react-native';
import { loadFonts } from 'src/shared/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const queryClient = new QueryClient();

export const App = () => {
	const [fontsLoaded] = loadFonts();

	if (!fontsLoaded) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<RootNavigator />
				<Toast />
			</SafeAreaProvider>
		</QueryClientProvider>
	);
};
