import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { HttpService } from 'src/shared/services/http.service';
import { LoginRequest, LoginResponse } from './types/login';
import { RegisterRequest } from './types/register';
import { RefreshResponse } from './types/refresh-token';

export class AuthService {
	constructor(private readonly httpService: HttpService) {}

	async login(data: LoginRequest): Promise<LoginResponse> {
		try {
			return this.httpService.post<LoginResponse, LoginRequest>(
				'auth/login',
				data,
			);
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	}

	async register(data: RegisterRequest): Promise<void> {
		return this.httpService.post<void, RegisterRequest>(
			'auth/register',
			data,
		);
	}

	async verifyOtp(email: string, otpCode: string): Promise<void> {
		return this.httpService.post<void, { otpCode: string }>(
			`auth/verify-otp/${email}`,
			{ otpCode },
		);
	}

	async refresh(): Promise<RefreshResponse> {
		return this.httpService.post<RefreshResponse, object>(
			'auth/refresh',
			{},
		);
	}

	async logout(): Promise<void> {
		return this.httpService.post<void, object>('auth/logout', {});
	}
}

export const authService = new AuthService(
	new HttpFactoryService().createHttpService(),
);
