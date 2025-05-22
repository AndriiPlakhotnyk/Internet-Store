import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from 'src/shared/componetnts/input';
import { registerSchema } from './register.schema';
import { RegisterFormInputs } from './register.interface';
import { registerStyles } from './register.styles';
import { authService } from 'src/modules/services/user/auth.service';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { AxiosError } from 'axios';
import { Layout } from 'src/shared/componetnts/layout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAvoidingLayout } from 'src/shared/componetnts/scroll';
import { useMutation } from '@tanstack/react-query';
import { toastMessage } from 'src/shared/componetnts/toast';
import { Loader } from 'src/shared/componetnts/loader';
import AuthActions from 'src/shared/componetnts/footer-auth/footer.component';

export const RegisterScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<RegisterFormInputs>({
		defaultValues: {
			email: '',
			fullName: '',
			phoneNumber: '',
			shippingAddress: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerSchema),
		mode: 'onChange',
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	const handleRegister = async (data: RegisterFormInputs) => {
		await mutation.mutateAsync(data);
	};

	const mutation = useMutation({
		mutationFn: async (data: RegisterFormInputs) =>
			authService.register(data),
		onSuccess: (_, variables) => {
			navigation.navigate(NAVIGATION_KEYS.VERIFY_CODE, {
				email: variables.email,
			});
		},
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

	return (
		<KeyboardAvoidingLayout>
			<Layout>
				<Text style={registerStyles.title}>Sign Up</Text>

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

				<Controller
					control={control}
					name="fullName"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							label="Full name"
							placeholder="Enter your full name"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={!!errors.fullName}
							errorMessage={errors.fullName?.message || ''}
						/>
					)}
				/>

				<Controller
					control={control}
					name="phoneNumber"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							label="Phone number"
							placeholder="Enter your phone number"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={!!errors.phoneNumber}
							errorMessage={errors.phoneNumber?.message || ''}
						/>
					)}
				/>

				<Controller
					control={control}
					name="shippingAddress"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							label="Shipping address"
							placeholder="Enter your address"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
							error={!!errors.shippingAddress}
							errorMessage={errors.shippingAddress?.message || ''}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={registerStyles.passwordContainer}>
							<CustomInput
								label="Password"
								placeholder="Enter your password"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								secureTextEntry={!isPasswordVisible}
								error={!!errors.password}
								errorMessage={errors.password?.message || ''}
								togglePasswordVisibility={true}
								isPasswordVisible={isPasswordVisible}
								onTogglePasswordVisibility={() =>
									setIsPasswordVisible((state) => !state)
								}
							/>
						</View>
					)}
				/>

				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { onChange, onBlur, value } }) => (
						<View style={registerStyles.passwordContainer}>
							<CustomInput
								label="Confirm Password"
								placeholder="Confirm your password"
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								secureTextEntry={!isConfirmPasswordVisible}
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
						</View>
					)}
				/>

				{mutation.status === 'pending' && <Loader />}

				<AuthActions
					buttonTitle="Sign up"
					onButtonPress={handleSubmit(handleRegister)}
					footerLabel="Already have an account?"
					footerLinkText="Sign In"
					onFooterPress={() =>
						navigation.navigate(NAVIGATION_KEYS.LOGIN)
					}
					isLoading={mutation.status === 'pending'}
					ableButton={isValid}
				/>
			</Layout>
		</KeyboardAvoidingLayout>
	);
};
