import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { HttpService } from 'src/shared/services/http.service';
import { LoginRequest, LoginResponse } from './types/login';
import { RegisterRequest } from './types/register';
import { VerifyRequest } from './types/verify-otp';
import { RecoverPasswordRequest } from './types/recover-password';

export class AuthService {
	constructor(private readonly httpService: HttpService) {}

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

	async forgotPassword(email: string): Promise<void> {
		return this.httpService.post<void, { email: string }>(
			'auth/forgot-password',
			{ email },
		);
	}

	async recoverPassword({
		token,
		newPassword,
	}: RecoverPasswordRequest): Promise<void> {
		return this.httpService.post<void, { newPassword: string }>(
			`auth/recover-password/${token}`,
			{ newPassword },
		);
	}
}

export const authService = new AuthService(
	new HttpFactoryService().createHttpService(),
);
