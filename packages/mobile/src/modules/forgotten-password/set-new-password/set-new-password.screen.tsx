import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Layout } from 'src/shared/componetnts/layout';
import { CustomInput } from 'src/shared/componetnts/input';
import { CustomButton } from 'src/shared/componetnts/button';
import { toastMessage } from 'src/shared/componetnts/toast';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { recoverPasswordService } from 'src/modules/services/user';
import { SetNewPasswordRequest } from 'src/modules/services/types/recover-password';
import { recoverPasswordSchema } from './set-new-password.schema';
import { SetNewPasswordInputs } from './recover-password.interface';
import { RouteProp } from '@react-navigation/native';
import { KeyboardAvoidingLayout } from 'src/shared/componetnts/scroll';
import { Header } from 'src/shared/componetnts/header';
import { setNewPasswordStyles } from './set-new-password.styles';
import { useState } from 'react';

export const SetNewPasswordScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const route =
		useRoute<
			RouteProp<
				RootStackParamList,
				NAVIGATION_KEYS.SET_FORGOTTEN_PASSWORD
			>
		>();

	const userId = route.params?.userId;

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<SetNewPasswordInputs>({
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
		resolver: yupResolver(recoverPasswordSchema),
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	const recoverPassword = useMutation({
		mutationFn: async (data: SetNewPasswordRequest) =>
			await recoverPasswordService.setNewPassword(data),
		onSuccess: () => {
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_RECOVER_PASSWORD);
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const errorMessage =
				err.response?.data?.message || 'Something went wrong';
			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const handleRecoverPassword = async ({
		newPassword,
	}: SetNewPasswordInputs) => {
		if (!userId) {
			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: 'User ID not found',
			});
			return;
		}

		await recoverPassword.mutateAsync({ userId, newPassword });
	};

	return (
		<KeyboardAvoidingLayout>
			<Layout>
				<View style={setNewPasswordStyles.container}>
					<Header text={'Update Password'} arrowBack={false} />
					<View style={setNewPasswordStyles.inputContainer}>
						<Controller
							control={control}
							name="newPassword"
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<CustomInput
									label="New Password"
									placeholder="Enter new password"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									secureTextEntry
									error={!!errors.newPassword}
									errorMessage={
										errors.newPassword?.message || ''
									}
									togglePasswordVisibility={true}
									isPasswordVisible={isPasswordVisible}
									onTogglePasswordVisibility={() =>
										setIsPasswordVisible((state) => !state)
									}
								/>
							)}
						/>
						<Controller
							control={control}
							name="confirmPassword"
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<CustomInput
									label="Confirm Password"
									placeholder="Confirm your password"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									secureTextEntry
									error={!!errors.confirmPassword}
									errorMessage={
										errors.confirmPassword?.message || ''
									}
									togglePasswordVisibility={true}
									isPasswordVisible={isConfirmPasswordVisible}
									onTogglePasswordVisibility={() =>
										setIsConfirmPasswordVisible(
											(state) => !state,
										)
									}
								/>
							)}
						/>
					</View>
				</View>

				<CustomButton
					title="Save"
					onPress={handleSubmit(handleRecoverPassword)}
					disabled={!isValid}
				/>
			</Layout>
		</KeyboardAvoidingLayout>
	);
};
