import React from 'react';
import { View, Alert, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from 'src/shared/componetnts/button';
import { CustomInput } from 'src/shared/componetnts/input';
import { registerSchema } from './register.schema';
import { RegisterFormInputs } from './register.interface';
import { registerStyles } from './register.styles';
import { authService } from '../../services/auth.service';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	RootStackParamList,
	NAVIGATION_KEYS,
} from 'src/modules/navigation/types';
import { AxiosError } from 'axios';

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

	const handleRegister = async (data: RegisterFormInputs) => {
		try {
			console.log('DATA: ', data);
			await authService.register(data);
			navigation.navigate(NAVIGATION_KEYS.VERIFY_CODE, {
				email: data.email,
			});
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;

			if (errorMessage === 'User with this email already exists') {
				Alert.alert('Error', errorMessage);
			}
			Alert.alert('Error', errorMessage);
		}
	};

	return (
		<View style={registerStyles.container}>
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

			<Controller
				control={control}
				name="confirmPassword"
				render={({ field: { onChange, onBlur, value } }) => (
					<CustomInput
						label="Confirm Password"
						placeholder="Confirm your password"
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
				title="Sign up"
				onPress={handleSubmit(handleRegister)}
				disabled={!isValid}
			/>

			<View style={registerStyles.footer}>
				<Text style={registerStyles.footerText}>
					Have you already registered?
				</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate(NAVIGATION_KEYS.LOGIN)}
				>
					<Text style={registerStyles.loginText}> Sign In</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
