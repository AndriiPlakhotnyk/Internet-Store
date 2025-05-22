import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
	CodeField,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { CustomButton } from 'src/shared/componetnts/button';
import { verificationStyles } from './verification-code.styles';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { authService } from 'src/modules/services/user/auth.service';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation } from '@tanstack/react-query';
import { toastMessage } from 'src/shared/componetnts/toast';
import { Loader } from 'src/shared/componetnts/loader';
import { Layout } from 'src/shared/componetnts/layout';

const CELL_COUNT = 4;

export const VerificationCodeScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route =
		useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.VERIFY_CODE>>();
	const email = route.params?.email;

	const [code, setCode] = useState('');
	const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	const handleVerification = async () => {
		if (email && code.length === CELL_COUNT) {
			await mutation.mutateAsync();
		} else {
			toastMessage({
				type: 'error',
				text1: 'Invalid code',
				text2: 'Please enter a valid 4-digit',
			});
		}
	};

	const mutation = useMutation({
		mutationFn: async () => authService.verifyOtp({ email, otpCode: code }),
		onSuccess: () => {
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_VERIFICATION);
		},
		onError: () => {
			toastMessage({
				type: 'error',
				text1: 'Verification failed!',
				text2: 'Please check the code and try again',
			});
		},
	});

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
			{mutation.status === 'pending' && <Loader />}
		</Layout>
	);
};
