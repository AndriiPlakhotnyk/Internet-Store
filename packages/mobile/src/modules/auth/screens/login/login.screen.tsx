import React from 'react';
import { View, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from 'src/store/auth.store';
import { loginStyles } from './login.styles';
import { CustomButton } from 'src/shared/componetnts/button';
import { CustomInput } from 'src/shared/componetnts/input';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginSchema } from './login.schema';
import { LoginFormInputs } from './login.interface';
import { authService } from '../../services/auth.service';
import { AxiosError } from 'axios';

export const LoginScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const login = useAuthStore((state) => state.login);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(loginSchema),
	});

	const handleLogin = async (data: LoginFormInputs) => {
		try {
			const response = await authService.login(data);
			const { accessToken, refreshToken } = response;
			login(accessToken, refreshToken);
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;

			if (errorMessage === 'User is not verified') {
				Alert.alert(
					'Error',
					'You are not verified, please check your email',
				);
				navigation.navigate(NAVIGATION_KEYS.VERIFY_CODE, {
					email: data.email,
				});
				return;
			}

			Alert.alert('Error', 'Incorrect email or password');
		}
	};

	return (
		<View style={loginStyles.container}>
			<Image
				source={require('../../../../../assets/images/logo.png')}
				style={loginStyles.logo}
				resizeMode="contain"
			/>

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
					<CustomInput
						label="Password"
						placeholder="Enter your password"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						secureTextEntry
						error={!!errors.password}
						errorMessage={errors.password?.message || ''}
					/>
				)}
			/>

			<CustomButton title="Sign in" onPress={handleSubmit(handleLogin)} />

			<View style={loginStyles.footer}>
				<Text style={loginStyles.footerText}>
					Don’t have an account?
				</Text>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate(NAVIGATION_KEYS.REGISTER)
					}
				>
					<Text style={loginStyles.signupText}> Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
