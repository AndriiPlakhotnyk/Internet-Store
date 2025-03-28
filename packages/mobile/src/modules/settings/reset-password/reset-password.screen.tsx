import React from 'react';
import { View, Alert, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from 'src/shared/componetnts/button';
import { CustomInput } from 'src/shared/componetnts/input';
import { resetPasswordSchema } from './reset-password.schema';
import { ResetPasswordFormInputs } from './reset-password.interface';
import { resetPasswordStyles } from './reset-password.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	RootStackParamList,
	NAVIGATION_KEYS,
} from 'src/modules/navigation/types';
import { AxiosError } from 'axios';
import { userService } from 'src/modules/services/user.service';

export const ResetPasswordScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ResetPasswordFormInputs>({
		defaultValues: {
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		resolver: yupResolver(resetPasswordSchema),
		mode: 'onChange',
	});

	const handleResetPassword = async (data: ResetPasswordFormInputs) => {
		try {
			await userService.resetPassword(data);
			Alert.alert('Success', 'Your password has been updated!');
			navigation.navigate(NAVIGATION_KEYS.SETTINGS);
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage =
				error.response?.data?.message || 'Something went wrong!';
			Alert.alert('Error', errorMessage);
		}
	};

	return (
		<View style={resetPasswordStyles.container}>
			<Text style={resetPasswordStyles.title}>Reset Password</Text>

			<Controller
				control={control}
				name="oldPassword"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomInput
						label="Old Password"
						placeholder="Enter your old password"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						secureTextEntry
						error={!!errors.oldPassword}
						errorMessage={errors.oldPassword?.message || ''}
					/>
				)}
			/>

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
				name="confirmNewPassword"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomInput
						label="Confirm New Password"
						placeholder="Confirm your new password"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						secureTextEntry
						error={!!errors.confirmNewPassword}
						errorMessage={errors.confirmNewPassword?.message || ''}
					/>
				)}
			/>

			<CustomButton
				title="Reset Password"
				onPress={handleSubmit(handleResetPassword)}
				disabled={!isValid}
			/>
		</View>
	);
};
