import React, { FunctionComponent } from 'react';
import { NavigationContainer } from '@react-navigation/native';

type NavContainerProps = {
	children: React.ReactNode;
};

const linking = {
	prefixes: ['exp://10.100.102.3:8081/--/', 'myapp://'],
	config: {
		screens: {
			LOGIN: 'LOGIN',
			REGISTER: 'REGISTER',
			VERIFY_CODE: 'VERIFY-CODE',
			SUCCESS_VERIFICATION: 'SUCCESS-VERIFICATION',
			FORGOT_PASSWORD: 'FORGOT-PASSWORD',
			'RECOVER-PASSWORD': 'RECOVER-PASSWORD/:token',
			PRODUCTS: 'PRODUCTS',
			SETTINGS: 'SETTINGS',
		},
	},
};

export const NavContainer: FunctionComponent<NavContainerProps> = ({
	children,
}) => {
	return (
		<NavigationContainer linking={linking}>{children}</NavigationContainer>
	);
};

export default linking;
