import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '../navigation/components/root-navigator';
import 'src/shared/services/mainAxios.interceptors.ts';

export const App = () => {
	return (
		<SafeAreaProvider>
			<RootNavigator />
		</SafeAreaProvider>
	);
};
