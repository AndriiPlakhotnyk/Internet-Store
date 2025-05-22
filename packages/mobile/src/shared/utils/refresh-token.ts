import type { LoginResponse } from 'src/modules/services/types/auth/login';
import { IHttpClient } from '../services/types';

export async function refreshTokenFlow(
	http: IHttpClient,
	refreshToken: string,
): Promise<LoginResponse> {
	return http.post<LoginResponse, object>(
		'auth/refresh',
		{},
		{ headers: { Authorization: `Bearer ${refreshToken}` } },
	);
}
