import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from 'src/modules/auth/screens/login';
import { RegisterScreen } from 'src/modules/auth/screens/register';
import { VerificationCodeScreen } from 'src/modules/auth/screens/verification/verification-code';
import { SuccessVerificationScreen } from 'src/modules/auth/screens/verification/verification-result';
import { SCREEN_OPTIONS } from '../../constants';
import { NAVIGATION_KEYS } from '../../types';
import { NavContainer } from '../nav-container';
import useAuthStore from 'src/store/auth.store';
import { ProductsScreen } from 'src/modules/products/products-screen';
import { SettingsScreen } from 'src/modules/settings';
import { OrdersScreen } from 'src/modules/orders';
import { CustomTabBar } from 'src/modules/products/products-footer';
import { ProductDetailScreen } from 'src/modules/product-detail/product-detail-screen/product-detail.screen';
import { CartScreen } from 'src/modules/cart';
import { EditCartItemScreen } from 'src/modules/edit-cart-item';
import { OrderDetailsScreen } from 'src/modules/order-details';
import { OrderDetailScreen } from 'src/modules/order-detail/order-detail.screen';
import { ResetPasswordScreen } from 'src/modules/change-password';
import { SuccessChangePasswordScreen } from 'src/modules/change-password/change-password-result';
import { SuccessUpdateProfileScreen } from 'src/modules/user-profile/update-profile-result';
import { ProfileScreen } from 'src/modules/user-profile/user-profile.screen';
import { SuccessOrderScreen } from 'src/modules/cart/order-success-result';
import { SuccessPaymentScreen } from 'src/modules/order-details/success-payment-result';
import { RecoverPasswordScreen } from 'src/modules/forgotten-password/recover-password';
import { VerificationRecoverPasswordScreen } from 'src/modules/forgotten-password/verification-recover-password';
import { SetNewPasswordScreen } from 'src/modules/forgotten-password/set-new-password';
import { SuccessRecoverPasswordScreen } from 'src/modules/forgotten-password/set-new-password/recover-password-result';
import { FAQScreen } from 'src/modules/faq/faq-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const AuthStack = () => (
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
			<Stack.Screen
				name={NAVIGATION_KEYS.RECOVER_PASSWORD}
				component={RecoverPasswordScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.VERIFICATION_RECOVER_PASSWORD}
				component={VerificationRecoverPasswordScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SET_FORGOTTEN_PASSWORD}
				component={SetNewPasswordScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESS_RECOVER_PASSWORD}
				component={SuccessRecoverPasswordScreen}
				options={SCREEN_OPTIONS}
			/>
		</Stack.Navigator>
	);

	const PrivateStack = () => (
		<Stack.Navigator>
			<Stack.Screen
				name={NAVIGATION_KEYS.TABS}
				component={TabNavigator}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PRODUCT_DETAILS}
				component={ProductDetailScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.CART}
				component={CartScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.EDIT_CART_ITEM}
				component={EditCartItemScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESS_ORDER}
				component={SuccessOrderScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.ORDER_DETAILS}
				component={OrderDetailsScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.ORDER_DETAIL}
				component={OrderDetailScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.RESET_PASSWORD}
				component={ResetPasswordScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESS_RESET_PASSWORD}
				component={SuccessChangePasswordScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESS_UPDATE_PROFILE}
				component={SuccessUpdateProfileScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PROFILE}
				component={ProfileScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESS_PAYMENT}
				component={SuccessPaymentScreen}
				options={SCREEN_OPTIONS}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.FAQ}
				component={FAQScreen}
				options={SCREEN_OPTIONS}
			/>
		</Stack.Navigator>
	);

	const TabNavigator = () => (
		<Tab.Navigator
			tabBar={(props) => <CustomTabBar {...props} />}
			initialRouteName={NAVIGATION_KEYS.PRODUCTS}
		>
			<Tab.Screen
				name={NAVIGATION_KEYS.PRODUCTS}
				component={ProductsScreen}
				options={SCREEN_OPTIONS}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.ORDERS}
				component={OrdersScreen}
				options={SCREEN_OPTIONS}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.SETTINGS}
				component={SettingsScreen}
				options={SCREEN_OPTIONS}
			/>
		</Tab.Navigator>
	);

	return (
		<NavContainer>
			{isAuthenticated ? <PrivateStack /> : <AuthStack />}
		</NavContainer>
	);
};
