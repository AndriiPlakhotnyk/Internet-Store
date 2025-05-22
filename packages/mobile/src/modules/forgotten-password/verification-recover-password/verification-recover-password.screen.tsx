import { useMutation } from '@tanstack/react-query';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS, RootStackParamList } from '../../navigation/types';
import { toastMessage } from 'src/shared/componetnts/toast';
import { AxiosError } from 'axios';
import { useState } from 'react';
import {
	CodeField,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { verificationStyles } from './verification-recover-password.styles';
import { Layout } from 'src/shared/componetnts/layout';
import { View, Text } from 'react-native';
import { CustomButton } from 'src/shared/componetnts/button';
import { Loader } from 'src/shared/componetnts/loader';
import { recoverPasswordService } from '../../services/user/recover-password.service';

const CELL_COUNT = 4;

export const VerificationRecoverPasswordScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const route =
		useRoute<
			RouteProp<
				RootStackParamList,
				NAVIGATION_KEYS.VERIFICATION_RECOVER_PASSWORD
			>
		>();
	const userId = route.params?.userId;

	const [code, setCode] = useState('');
	const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	const verifyForRecoverPasswordMutation = useMutation({
		mutationFn: async ({
			userId,
			code,
		}: {
			userId: string;
			code: string;
		}) => {
			console.log('userId: ', userId, ' code: ', code);
			recoverPasswordService.verifyRecoverPassword({ userId, code });
		},
		onSuccess: () =>
			navigation.navigate(NAVIGATION_KEYS.SET_FORGOTTEN_PASSWORD, {
				userId,
			}),
		onError: (err: AxiosError<string>) => {
			const errorMessage = err.response?.data
				? typeof err.response?.data === 'string'
					? err.response?.data
					: 'An unknown error occurred'
				: 'An unknown error occurred';
			console.log('Error: ', errorMessage);
			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const handleVerification = async () => {
		if (userId && code.length === CELL_COUNT) {
			await verifyForRecoverPasswordMutation.mutateAsync({
				userId,
				code,
			});
		} else {
			toastMessage({
				type: 'error',
				text1: 'Invalid code',
				text2: 'Please enter a valid 4-digit code',
			});
		}
	};

	return (
		<Layout>
			<View style={verificationStyles.container}>
				<Text style={verificationStyles.title}>Email Verification</Text>
				<Text style={verificationStyles.subtitle}>
					Please type the code from the email
				</Text>
				<CodeField
					ref={ref}
					{...props}
					value={code}
					onChangeText={setCode}
					cellCount={CELL_COUNT}
					rootStyle={verificationStyles.codeInputContainer}
					keyboardType="numeric"
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[
								verificationStyles.codeInput,
								isFocused && verificationStyles.focusCell,
							]}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? '|' : null)}
						</Text>
					)}
				/>
			</View>
			<CustomButton title="Submit" onPress={handleVerification} />
			{verifyForRecoverPasswordMutation.status === 'pending' && (
				<Loader />
			)}
		</Layout>
	);
};
