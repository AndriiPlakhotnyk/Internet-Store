import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from 'src/shared/componetnts/input';
import { recoverPasswordSchema } from './recover-password.schema';
import { recoverPasswordStyles } from './recover-password.styles';
import { authService } from 'src/modules/services/auth.service';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	RootStackParamList,
	NAVIGATION_KEYS,
} from 'src/modules/navigation/types';
import { AxiosError } from 'axios';
import { CustomButton } from 'src/shared/componetnts/button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RecoverPasswordFormInputs } from './recover-pass.interface';

export const RecoverPasswordScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const route =
		useRoute<
			RouteProp<RootStackParamList, NAVIGATION_KEYS.RECOVER_PASSWORD>
		>();

	const token = route.params?.token || '';

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
		resolver: yupResolver(recoverPasswordSchema),
		mode: 'onChange',
	});

	const handleRecoverPassword = async (data: RecoverPasswordFormInputs) => {
		try {
			await authService.recoverPassword({
				token,
				newPassword: data.newPassword,
			});
			Alert.alert('Success', 'Password updated. You can now log in.');
			navigation.navigate(NAVIGATION_KEYS.LOGIN);
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;
			Alert.alert('Error', errorMessage || 'Invalid or expired token.');
		}
	};

	return (
		<View style={recoverPasswordStyles.container}>
			<Text style={recoverPasswordStyles.title}>Recover Password</Text>

			<Controller
				control={control}
				name="newPassword"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomInput
						label="New Password"
						placeholder="Enter your new password"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						secureTextEntry
						error={!!errors.newPassword}
						errorMessage={errors.newPassword?.message || ''}
					/>
				)}
			/>

			<Controller
				control={control}
				name="confirmPassword"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomInput
						label="Confirm New Password"
						placeholder="Confirm your new password"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						secureTextEntry
						error={!!errors.confirmPassword}
						errorMessage={errors.confirmPassword?.message || ''}
					/>
				)}
			/>

			<CustomButton
				title="Recover Password"
				onPress={handleSubmit(handleRecoverPassword)}
				disabled={!isValid}
			/>

			<View style={recoverPasswordStyles.footer}>
				<Text style={recoverPasswordStyles.footerText}>
					Have you already remember password?
				</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate(NAVIGATION_KEYS.LOGIN)}
				>
					<Text style={recoverPasswordStyles.rememberText}>
						Sign In
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
