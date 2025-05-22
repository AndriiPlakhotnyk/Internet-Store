import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { IHttpClient } from 'src/shared/services/types';
import {
	RecoverPasswordRequest,
	SetNewPasswordRequest,
	VerifyRecoverPasswordReqeust,
} from '../types/recover-password';

class RecoverPasswordService {
	constructor(private readonly httpService: IHttpClient) {}

	async recoverPasswordRequest(
		data: RecoverPasswordRequest,
	): Promise<string> {
		console.log('Method_service_START');
		return this.httpService.post<string, RecoverPasswordRequest>(
			'recover-password/check-email',
			data,
		);
	}

	async verifyRecoverPassword({
		code,
		userId,
	}: VerifyRecoverPasswordReqeust): Promise<void> {
		return this.httpService.post<void, string>(
			`recover-password/verification/${userId}`,
			code,
		);
	}

	async setNewPassword({ userId, newPassword }: SetNewPasswordRequest) {
		return this.httpService.post<
			void,
			{
				newPassword: string;
			}
		>(`recover-password/set-new-password/${userId}`, { newPassword });
	}
}

export const recoverPasswordService = new RecoverPasswordService(
	new HttpFactoryService().createHttpService(),
);
