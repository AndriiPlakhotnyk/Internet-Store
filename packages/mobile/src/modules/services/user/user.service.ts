import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import {
	UpdateProfileRequest,
	UpdateProfileResponse,
} from '../types/update-profile';
import { ResetPasswordRequest } from '../types/reset-password';
import { IHttpClient } from 'src/shared/services/types';

class UserService {
	constructor(private readonly httpService: IHttpClient) {}

	async getUserInfo(): Promise<UpdateProfileResponse> {
		return this.httpService.get<UpdateProfileResponse>('user/user-info');
	}

	async updateProfile(
		data: UpdateProfileRequest,
	): Promise<UpdateProfileResponse> {
		return this.httpService.put<
			UpdateProfileResponse,
			UpdateProfileRequest
		>('user/profile', data);
	}

	async resetPassword(data: ResetPasswordRequest): Promise<void> {
		return this.httpService.put<void, ResetPasswordRequest>(
			'user/reset-password',
			data,
		);
	}
}

export const userService = new UserService(
	new HttpFactoryService().createAuthHttpService(),
);
