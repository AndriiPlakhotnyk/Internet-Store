import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HttpFactoryService } from '~shared/services/http-factory.service';
import { Input } from '../input';
import { Button } from '../mybutton';
import { ErrorMessage, FieldWrapper, Form, Label } from './login-form.styles';
import useAuthStore from '~store/auth.store';
import { schema } from './login.schema';
import { LoginResponse } from './login-response.interface';

type LoginFormInputs = yup.InferType<typeof schema>;

const LoginForm: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
	});

	const httpFactory = new HttpFactoryService();
	const httpService = httpFactory.createAuthHttpService();

	const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
		setIsLoading(true);

		try {
			const response = await httpService.post<
				LoginResponse,
				LoginFormInputs
			>('auth/login', data);
			const { accessToken, refreshToken } = response;
			useAuthStore.getState().login(accessToken, refreshToken);
			reset();
		} catch (error) {
			if (error.response?.status === 404) {
				setError('email', { message: '' });
				setError('password', {
					message: 'Incorrect email or password',
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FieldWrapper>
				<Label>Email</Label>
				<Input
					type="email"
					isError={!!errors.email}
					{...register('email')}
					disabled={isLoading}
				/>
				{errors.email && (
					<ErrorMessage>{errors.email.message}</ErrorMessage>
				)}
			</FieldWrapper>

			<FieldWrapper>
				<Label>Пароль</Label>
				<Input
					type="password"
					isError={!!errors.password}
					{...register('password')}
					disabled={isLoading}
				/>
				{errors.password && (
					<ErrorMessage>{errors.password.message}</ErrorMessage>
				)}
			</FieldWrapper>

			<Button type="submit" disabled={isLoading}>
				{isLoading ? 'Loading...' : 'Login'}
			</Button>
		</Form>
	);
};

export default LoginForm;
