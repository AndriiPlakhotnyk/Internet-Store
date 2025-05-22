import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { recoverPasswordStyles } from './recover-password.styles';
import { RecoverPasswordInputs } from './recover-password.interface';
import { recoverPasswordSchema } from './recover-password.schema';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS, RootStackParamList } from '../../navigation/types';
import { AxiosError } from 'axios';
import { recoverPasswordService } from '../../services/user/recover-password.service';
import { toastMessage } from 'src/shared/componetnts/toast';
import { Layout } from 'src/shared/componetnts/layout';
import { CustomInput } from 'src/shared/componetnts/input';
import { RecoverPasswordRequest } from '../../services/types/recover-password';
import { KeyboardAvoidingLayout } from 'src/shared/componetnts/scroll';
import { Header } from 'src/shared/componetnts/header';
import AuthActions from 'src/shared/componetnts/footer-auth/footer.component';

export const RecoverPasswordScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<RecoverPasswordInputs>({
		defaultValues: {
			email: '',
		},
		resolver: yupResolver(recoverPasswordSchema),
	});

	const recoverPassword = useMutation({
		mutationFn: async (data: RecoverPasswordRequest) =>
			await recoverPasswordService.recoverPasswordRequest(data),
		onSuccess: (userId: string) => {
			navigation.navigate(NAVIGATION_KEYS.VERIFICATION_RECOVER_PASSWORD, {
				userId,
			});
		},
		onError: (err: AxiosError<{ message: string }>) => {
			const errorMessage = err.response?.data?.message;
			console.log('Error: ', errorMessage);
			toastMessage({
				type: 'error',
				text1: 'Error',
				text2: errorMessage,
			});
		},
	});

	const handleRecoverPassword = (data: RecoverPasswordInputs) => {
		recoverPassword.mutateAsync(data);
	};

	return (
		<KeyboardAvoidingLayout>
			<Layout>
				<View style={recoverPasswordStyles.container}>
					<Header text={'Recover Password'} arrowBack={false} />
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
				</View>
				<AuthActions
					buttonTitle="Send code"
					onButtonPress={handleSubmit(handleRecoverPassword)}
					footerLabel="Remember password?"
					footerLinkText="Sign Ip"
					onFooterPress={() =>
						navigation.navigate(NAVIGATION_KEYS.LOGIN)
					}
					isLoading={recoverPassword.status === 'pending'}
					ableButton={isValid}
				/>
			</Layout>
		</KeyboardAvoidingLayout>
	);
};
