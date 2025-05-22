import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { LoginRequest, LoginResponse } from '../types/auth/login';
import { RegisterRequest } from '../types/auth/register';
import { VerifyRequest } from '../types/auth/verify-otp';
import { IHttpClient } from 'src/shared/services/types';

export class AuthService {
	constructor(private readonly httpService: IHttpClient) {}

	async login(data: LoginRequest): Promise<LoginResponse> {
		return this.httpService.post<LoginResponse, LoginRequest>(
			'auth/login',
			data,
		);
	}

	async register(data: RegisterRequest): Promise<void> {
		return this.httpService.post<void, RegisterRequest>(
			'auth/register',
			data,
		);
	}

	async verifyOtp({ email, otpCode }: VerifyRequest): Promise<void> {
		return this.httpService.post<void, { otpCode: string }>(
			`auth/verify-otp/${email}`,
			{ otpCode },
		);
	}

	async logout(refreshToken: string): Promise<void> {
		return this.httpService.post<void, object>(
			'auth/logout',
			{},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);
	}

	async refresh(refreshToken: string): Promise<LoginResponse> {
		return this.httpService.post<LoginResponse, object>(
			'auth/refresh',
			{},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);
	}
}

export const authService = new AuthService(
	new HttpFactoryService().createAuthHttpService(),
);
