import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomButton } from 'src/shared/componetnts/button';
import { CustomInput } from 'src/shared/componetnts/input';
import { profileSchema } from './user-profile.schema';
import { ProfileFormInputs } from './user-profile.interface';
import { profileStyles } from './user-profile.styles';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { toastMessage } from 'src/shared/componetnts/toast';
import { useMutation } from '@tanstack/react-query';
import { Layout } from 'src/shared/componetnts/layout';
import { KeyboardAvoidingLayout } from 'src/shared/componetnts/scroll';
import { Header } from 'src/shared/componetnts/header';
import { userService } from '../services/user';

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
				toastMessage({
					type: 'error',
					text1: 'Error',
					text2: errorMessage,
				});
			}
		};

		fetchUserInfo();
	}, [setValue]);

	const updateProfileMutation = useMutation({
		mutationFn: async (data: ProfileFormInputs) =>
			await userService.updateProfile(data),
		onSuccess: () =>
			navigation.navigate(NAVIGATION_KEYS.SUCCESS_UPDATE_PROFILE),
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

	const handleUpdateProfile = (data: ProfileFormInputs) => {
		updateProfileMutation.mutateAsync(data);
	};

	return (
		<KeyboardAvoidingLayout>
			<Layout>
				<Header text={'Personal Info'} />
				<View style={profileStyles.container}>
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
								editable={false}
								grayBackground={true}
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
								errorMessage={
									errors.shippingAddress?.message || ''
								}
							/>
						)}
					/>
				</View>
				<CustomButton
					title="Save"
					onPress={handleSubmit(handleUpdateProfile)}
					disabled={!isValid}
				/>
			</Layout>
		</KeyboardAvoidingLayout>
	);
};
