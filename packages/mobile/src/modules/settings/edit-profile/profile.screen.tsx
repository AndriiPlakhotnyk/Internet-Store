import React, { useEffect } from 'react';
import { View, Alert, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton } from 'src/shared/componetnts/button';
import { CustomInput } from 'src/shared/componetnts/input';
import { profileSchema } from './profile.schema';
import { ProfileFormInputs } from './profile.interface';
import { profileStyles } from './profile.styles';
import { userService } from 'src/modules/services/user.service';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

export const ProfileScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors, isValid },
	} = useForm<ProfileFormInputs>({
		defaultValues: {
			email: '',
			fullName: '',
			phoneNumber: '',
			shippingAddress: '',
		},
		resolver: yupResolver(profileSchema),
		mode: 'onChange',
	});

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await userService.getUserInfo();
				setValue('email', response.email);
				setValue('fullName', response.fullName);
				setValue('phoneNumber', response.phoneNumber);
				setValue('shippingAddress', response.shippingAddress);
			} catch (err) {
				const error = err as AxiosError<{ message: string }>;
				const errorMessage =
					error.response?.data?.message || 'Cannot get information';
				Alert.alert('Error', errorMessage);
			}
		};

		fetchUserInfo();
	}, [setValue]);

	const handleUpdateProfile = async (data: ProfileFormInputs) => {
		try {
			await userService.updateProfile(data);
			navigation.navigate(NAVIGATION_KEYS.PRODUCTS);
			Alert.alert('Success', 'Profile updated successfully');
		} catch (err) {
			const error = err as AxiosError<{ message: string }>;
			const errorMessage =
				error.response?.data?.message || 'Something went wrong';
			Alert.alert('Error', errorMessage);
		}
	};

	return (
		<View style={profileStyles.container}>
			<Text style={profileStyles.title}>Edit Profile</Text>

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
						label="Full Name"
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
						label="Phone Number"
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
						label="Shipping Address"
						placeholder="Enter your address"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={!!errors.shippingAddress}
						errorMessage={errors.shippingAddress?.message || ''}
					/>
				)}
			/>

			<CustomButton
				title="Update Profile"
				onPress={handleSubmit(handleUpdateProfile)}
				disabled={!isValid}
			/>
		</View>
	);
};
