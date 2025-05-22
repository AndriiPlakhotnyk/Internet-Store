import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from 'src/shared/componetnts/button';
import { CustomInput } from 'src/shared/componetnts/input';
import { resetPasswordSchema } from './change-password.schema';
import { ResetPasswordFormInputs } from './change-password.interface';
import { resetPasswordStyles } from './change-password.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	RootStackParamList,
	NAVIGATION_KEYS,
} from 'src/modules/navigation/types';
import { AxiosError } from 'axios';
import { ResetPasswordRequest } from '../services/types/reset-password';
import { useMutation } from '@tanstack/react-query';
import { toastMessage } from 'src/shared/componetnts/toast';
import { KeyboardAvoidingLayout } from 'src/shared/componetnts/scroll';
import { Layout } from 'src/shared/componetnts/layout';
import { Header } from 'src/shared/componetnts/header';
import { userService } from '../services/user';

export const ResetPasswordScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
		useState(false);
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
	const [isConfirmNewPasswordVisible, setIsConfirmNewPasswordVisible] =
		useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ResetPasswordFormInputs>({
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		resolver: yupResolver(resetPasswordSchema),
		mode: 'onChange',
	});

	const resetPasswordMutation = useMutation({
		mutationFn: async (data: ResetPasswordRequest) =>
			await userService.resetPassword(data),
		onSuccess: () =>
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_RESET_PASSWORD),
		onError: (err: AxiosError<{ message: string }>) => {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;

			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const handleResetPassword = (data: ResetPasswordRequest) => {
		resetPasswordMutation.mutateAsync(data);
	};

	return (
		<KeyboardAvoidingLayout>
			<Layout>
				<Header text={'Change Password'} />
				<View style={resetPasswordStyles.container}>
					<Controller
						control={control}
						name="currentPassword"
						render={({ field: { onChange, onBlur, value } }) => (
							<CustomInput
								label="Current Password"
								placeholder="Enter your old password"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								secureTextEntry
								error={!!errors.currentPassword}
								errorMessage={
									errors.currentPassword?.message || ''
								}
								togglePasswordVisibility={true}
								isPasswordVisible={isCurrentPasswordVisible}
								onTogglePasswordVisibility={() =>
									setIsCurrentPasswordVisible(
										(state) => !state,
									)
								}
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
								togglePasswordVisibility={true}
								isPasswordVisible={isNewPasswordVisible}
								onTogglePasswordVisibility={() =>
									setIsNewPasswordVisible((state) => !state)
								}
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
								errorMessage={
									errors.confirmNewPassword?.message || ''
								}
								togglePasswordVisibility={true}
								isPasswordVisible={isConfirmNewPasswordVisible}
								onTogglePasswordVisibility={() =>
									setIsConfirmNewPasswordVisible(
										(state) => !state,
									)
								}
							/>
						)}
					/>
				</View>

				<CustomButton
					title="Save"
					onPress={handleSubmit(handleResetPassword)}
					disabled={!isValid}
				/>
			</Layout>
		</KeyboardAvoidingLayout>
	);
};
