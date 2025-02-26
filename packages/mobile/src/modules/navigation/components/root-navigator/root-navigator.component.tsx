import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from 'src/modules/auth/screens/login';
import { RegisterScreen } from 'src/modules/auth/screens/register';
import { VerificationCodeScreen } from 'src/modules/auth/screens/verification/verification-code';
import { SuccessVerificationScreen } from 'src/modules/auth/screens/verification/verification result';
import { SCREEN_OPTIONS } from '../../constants';
import useAuthStore from 'src/store/auth.store';
import { NAVIGATION_KEYS } from '../../types';
import { NavContainer } from '../nav-container';
import { ProductsScreen } from 'src/modules/auth/screens/products/products-screen';
import { SettingsScreen } from 'src/modules/auth/screens/settings/settings.screen';

const Stack = createNativeStackNavigator();

export default function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	const AuthStack = () => {
		return (
			<Stack.Navigator initialRouteName={NAVIGATION_KEYS.LOGIN}>
				<Stack.Screen
					name={NAVIGATION_KEYS.LOGIN}
					component={LoginScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.REGISTER}
					component={RegisterScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.VERIFY_CODE}
					component={VerificationCodeScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.SUCCESS_VERIFICATION}
					component={SuccessVerificationScreen}
					options={SCREEN_OPTIONS}
				/>
			</Stack.Navigator>
		);
	};

	const PrivateStack = () => {
		return (
			<Stack.Navigator initialRouteName={NAVIGATION_KEYS.PRODUCTS}>
				<Stack.Screen
					name={NAVIGATION_KEYS.PRODUCTS}
					component={ProductsScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.SETTINGS}
					component={SettingsScreen}
					options={SCREEN_OPTIONS}
				/>
			</Stack.Navigator>
		);
	};

	return (
		<NavContainer>
			{isAuthenticated ? <PrivateStack /> : <AuthStack />}
		</NavContainer>
	);
}
