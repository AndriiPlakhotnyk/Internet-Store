export enum NAVIGATION_KEYS {
	LOGIN = 'Login',
	REGISTER = 'Register',
	VERIFY_CODE = 'verifyCode',
	SUCCESS_VERIFICATION = 'SuccessVerification',
	PRODUCTS = 'Products',
	ORDERS = 'Orders',
	SETTINGS = 'Settings',
	PRODUCT_DETAILS = 'ProductDetails',
	CART = 'Cart',
	EDIT_CART_ITEM = 'EditCartItem',
	TABS = 'Tabs',
	ORDER_DETAILS = 'OrderDetails',
	ORDER_DETAIL = 'OrderDetail',
	RESET_PASSWORD = 'ChangePassword',
	SUCCESS_RESET_PASSWORD = 'SuccessResetPassword',
	SUCCESS_UPDATE_PROFILE = 'SuccessUpdateProfile',
	PROFILE = 'Profile',
	SUCCESS_PAYMENT = 'SuccessPayment',
	SUCCESS_ORDER = 'SuccessOrder',
	RECOVER_PASSWORD = 'RecoverPassword',
	VERIFICATION_RECOVER_PASSWORD = 'VerificationRecoverPassword',
	SET_FORGOTTEN_PASSWORD = 'SetForgottenPassword',
	SUCCESS_RECOVER_PASSWORD = 'SuccessRecoverPassword',
	FAQ = 'Faq',
}

export type RootStackParamList = {
	[NAVIGATION_KEYS.FAQ]: undefined;
	[NAVIGATION_KEYS.LOGIN]: undefined;
	[NAVIGATION_KEYS.REGISTER]: undefined;
	[NAVIGATION_KEYS.VERIFY_CODE]: { email: string };
	[NAVIGATION_KEYS.SUCCESS_VERIFICATION]: undefined;
	[NAVIGATION_KEYS.PRODUCTS]: undefined;
	[NAVIGATION_KEYS.ORDERS]: undefined;
	[NAVIGATION_KEYS.SETTINGS]: undefined;
	[NAVIGATION_KEYS.PRODUCT_DETAILS]: { productId: string };
	[NAVIGATION_KEYS.ORDER_DETAILS]: { orderId: string };
	[NAVIGATION_KEYS.ORDER_DETAIL]: {
		orderDetailId: string;
		paymentStatus: 'PENDING' | 'COMPLETE' | 'FAILED';
	};
	[NAVIGATION_KEYS.EDIT_CART_ITEM]: { productId: string };
	[NAVIGATION_KEYS.CART]: undefined;
	[NAVIGATION_KEYS.TABS]: {
		screen: NAVIGATION_KEYS.ORDERS | NAVIGATION_KEYS.SETTINGS;
	};
	[NAVIGATION_KEYS.RESET_PASSWORD]: undefined;
	[NAVIGATION_KEYS.SUCCESS_RESET_PASSWORD]: undefined;
	[NAVIGATION_KEYS.PROFILE]: undefined;
	[NAVIGATION_KEYS.SUCCESS_UPDATE_PROFILE]: undefined;
	[NAVIGATION_KEYS.SUCCESS_PAYMENT]: undefined;
	[NAVIGATION_KEYS.SUCCESS_ORDER]: { orderId: string };
	[NAVIGATION_KEYS.RECOVER_PASSWORD]: undefined;
	[NAVIGATION_KEYS.VERIFICATION_RECOVER_PASSWORD]: { userId: string };
	[NAVIGATION_KEYS.SET_FORGOTTEN_PASSWORD]: { userId: string };
	[NAVIGATION_KEYS.SUCCESS_RECOVER_PASSWORD]: undefined;
};
