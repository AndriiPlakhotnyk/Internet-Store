import { View } from 'react-native';
import useAuthStore from 'src/store/auth.store';
import { StringButton } from 'src/shared/componetnts/string-button';
import { Layout } from 'src/shared/componetnts/layout';
import { COLORS, FONTS } from 'src/shared/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS, RootStackParamList } from '../navigation/types';
import { Header } from 'src/shared/componetnts/header';
import { settingsStyles } from './settings.styles';
// import { useMutation } from '@tanstack/react-query';
// import { AxiosError } from 'axios';
// import { toastMessage } from 'src/shared/componetnts/toast';
// import { authService } from '../services/user/auth.service';

export const SettingsScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const refreshToken = useAuthStore.getState().refreshToken;
	if (!refreshToken) {
		throw new Error('Refresh token is missing');
	}

	// const logoutMutation = useMutation({
	// 	mutationFn: async () => await authService.logout(refreshToken),
	// 	onSuccess: () => useAuthStore.getState().logout(),
	// 	onError: (err: AxiosError<{ message: string }>) => {
	// 		const error = err as AxiosError<{ message: string }>;
	// 		const errorMessage = error.response?.data?.message;

	// 		toastMessage({
	// 			type: 'error',
	// 			text1: 'Error',
	// 			text2: errorMessage,
	// 		});
	// 	},
	// });

	const handleLogout = async () => {
		// console.log('refreshTOKEN: ', refreshToken);
		// await logoutMutation.mutateAsync();
		useAuthStore.getState().logout();
	};

	return (
		<Layout>
			<Header text={'Settings'} />
			<View style={settingsStyles.container}>
				<StringButton
					text="Change Password"
					color={COLORS.black}
					fontFamily={FONTS.regular}
					onPress={() =>
						navigation.navigate(NAVIGATION_KEYS.RESET_PASSWORD)
					}
				/>
				<StringButton
					text="Personal Info"
					color={COLORS.black}
					fontFamily={FONTS.regular}
					onPress={() => navigation.navigate(NAVIGATION_KEYS.PROFILE)}
				/>
				<StringButton
					text="FAQ"
					color={COLORS.black}
					fontFamily={FONTS.regular}
					onPress={() => navigation.navigate(NAVIGATION_KEYS.FAQ)}
				/>
				<StringButton
					text="Logout"
					color={COLORS.red}
					fontFamily={FONTS.regular}
					onPress={handleLogout}
				/>
			</View>
		</Layout>
	);
};
