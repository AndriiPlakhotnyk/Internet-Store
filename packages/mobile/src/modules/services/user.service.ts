import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { RefreshResponse } from './types/refresh-token';
import { ResetPasswordRequest } from './types/reset-password';
import useAuthStore from 'src/store/auth.store';
import {
	UpdateProfileRequest,
	UpdateProfileResponse,
} from './types/edit-profile';

class UserService {
	private accessToken: string;
	private refreshToken: string;

	constructor(private readonly authHttpService: EnhancedWithAuthHttpService) {
		this.accessToken = useAuthStore.getState().accessToken ?? '';
		this.refreshToken = useAuthStore.getState().refreshToken ?? '';
	}

	async getUserInfo(): Promise<UpdateProfileResponse> {
		return this.authHttpService.get<UpdateProfileResponse>(
			'user/user-info',
			{
				headers: this.getHeaders('access'),
			},
		);
	}

	private getHeaders(tokenType: 'access' | 'refresh') {
		const token =
			tokenType === 'access'
				? useAuthStore.getState().accessToken
				: useAuthStore.getState().refreshToken;

		if (!token) throw new Error(`${tokenType} token is missing`);

		return { Authorization: `Bearer ${token}` };
	}

	async updateProfile(
		data: UpdateProfileRequest,
	): Promise<UpdateProfileResponse> {
		return this.authHttpService.put<
			UpdateProfileResponse,
			UpdateProfileRequest
		>('user/profile', data, { headers: this.getHeaders('access') });
	}

	async resetPassword(data: ResetPasswordRequest): Promise<void> {
		return this.authHttpService.put<void, ResetPasswordRequest>(
			'user/reset-password',
			data,
			{ headers: this.getHeaders('access') },
		);
	}

	async logout(): Promise<void> {
		return this.authHttpService.post<void, object>(
			'auth/logout',
			{},
			{ headers: this.getHeaders('refresh') },
		);
	}

	async refreshTokens(): Promise<RefreshResponse> {
		return this.authHttpService.post<RefreshResponse, object>(
			'auth/refresh',
			{},
			{ headers: this.getHeaders('refresh') },
		);
	}
}

export const userService = new UserService(
	new HttpFactoryService().createAuthHttpService(),
);
