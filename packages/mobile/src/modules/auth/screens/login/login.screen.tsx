import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginStyles } from './login.styles';
import { CustomInput } from 'src/shared/componetnts/input';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { loginSchema } from './login.schema';
import { LoginFormInputs } from './login.interface';
import { AxiosError } from 'axios';
import { Layout } from 'src/shared/componetnts/layout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAvoidingLayout } from 'src/shared/componetnts/scroll';
import { IconComponent } from 'src/shared/componetnts/icons-map';
import useAuthStore from 'src/store/auth.store';
import { useMutation } from '@tanstack/react-query';
import { toastMessage } from 'src/shared/componetnts/toast';
import { Loader } from 'src/shared/componetnts/loader';
import AuthActions from 'src/shared/componetnts/footer-auth/footer.component';
import { LinkText } from 'src/shared/componetnts/link';
import { authService } from 'src/modules/services/user/auth.service';

export const LoginScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		setError,
	} = useForm<LoginFormInputs>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const login = useAuthStore((state) => state.login);

	const handleLogin = async (data: LoginFormInputs) => {
		await mutation.mutateAsync(data);
	};

	const mutation = useMutation({
		mutationFn: async (data: LoginFormInputs) => authService.login(data),
		onSuccess: ({ accessToken, refreshToken }) => {
			console.log('accessToken: ', accessToken);
			console.log('refreshToken: ', refreshToken);
			login(accessToken, refreshToken);
		},
		onError: (
			err: AxiosError<{ message: string }>,
			variables: LoginFormInputs,
		) => {
			const errorMessage = err.response?.data?.message;

			if (errorMessage === 'User is not verified') {
				toastMessage({
					type: 'error',
					text1: 'Error',
					text2: 'You are not verified, please check your email',
				});
				navigation.navigate(NAVIGATION_KEYS.VERIFY_CODE, {
					email: variables.email,
				});
				return;
			}

			setError('password', {
				type: 'manual',
				message: 'Incorrect email or password',
			});
		},
	});
	return (
		<KeyboardAvoidingLayout>
			<Layout>
				<View style={loginStyles.container}>
					<IconComponent name="logo" style={loginStyles.logo} />

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
						name="password"
						render={({ field: { onChange, onBlur, value } }) => (
							<View style={loginStyles.passwordContainer}>
								<CustomInput
									label="Password"
									placeholder="Enter your password"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									secureTextEntry={!isPasswordVisible}
									error={!!errors.password}
									errorMessage={
										errors.password?.message || ''
									}
									togglePasswordVisibility={true}
									isPasswordVisible={isPasswordVisible}
									onTogglePasswordVisibility={() =>
										setIsPasswordVisible((state) => !state)
									}
								/>
							</View>
						)}
					/>
					<LinkText
						label={'Forgot Password?'}
						linkText={'Recover Password'}
						onPress={() =>
							navigation.navigate(
								NAVIGATION_KEYS.RECOVER_PASSWORD,
							)
						}
					/>
				</View>

				{mutation.status === 'pending' && <Loader />}

				<AuthActions
					buttonTitle="Sign in"
					onButtonPress={handleSubmit(handleLogin)}
					footerLabel="Don’t have an account?"
					footerLinkText="Sign Up"
					onFooterPress={() =>
						navigation.navigate(NAVIGATION_KEYS.REGISTER)
					}
					isLoading={mutation.status === 'pending'}
					ableButton={isValid}
				/>
			</Layout>
		</KeyboardAvoidingLayout>
	);
};
