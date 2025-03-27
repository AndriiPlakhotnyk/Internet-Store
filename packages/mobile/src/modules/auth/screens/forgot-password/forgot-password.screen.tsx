import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from 'src/shared/componetnts/input';
import { forgotPasswordSchema } from './forgot-password.schema';
import { forgotPasswordStyles } from './forgot-password.styles';
import { authService } from 'src/modules/services/auth.service';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	RootStackParamList,
	NAVIGATION_KEYS,
} from 'src/modules/navigation/types';
import { AxiosError } from 'axios';
import { CustomButton } from 'src/shared/componetnts/button';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordInputs } from './forgot-pass.interface';

export const ForgotPasswordScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(forgotPasswordSchema),
		mode: 'onChange',
	});

	const handleForgotPassword = async (data: ForgotPasswordInputs) => {
		try {
			await authService.forgotPassword(data.email);
			Alert.alert('Success', 'Check your email for the reset link.');
			navigation.navigate(NAVIGATION_KEYS.LOGIN);
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;
			Alert.alert('Error', errorMessage || 'Something went wrong.');
		}
	};

	return (
		<View style={forgotPasswordStyles.container}>
			<Text style={forgotPasswordStyles.title}>Forgot Password</Text>

			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomInput
						label="Email"
						placeholder="Enter your email"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={!!errors.email}
						errorMessage={errors.email?.message || ''}
					/>
				)}
			/>

			<CustomButton
				title="Send Reset Link"
				onPress={handleSubmit(handleForgotPassword)}
				disabled={!isValid}
			/>

			<View style={forgotPasswordStyles.footer}>
				<Text style={forgotPasswordStyles.footerText}>
					Remembered your password?
				</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate(NAVIGATION_KEYS.LOGIN)}
				>
					<Text style={forgotPasswordStyles.loginText}> Sign In</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
