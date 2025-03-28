import { mainAxios } from './mainAxios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import useAuthStore from 'src/store/auth.store';
import { userService } from 'src/modules/services/user.service';

let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (_: AxiosError | null, token: string | null) => {
	failedQueue.forEach((callback) => callback(token ?? ''));
	failedQueue = [];
};

mainAxios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise<string>((resolve) => {
					failedQueue.push((newToken) => resolve(newToken));
				}).then((newToken) => {
					originalRequest.headers = {
						...originalRequest.headers,
						Authorization: `Bearer ${newToken}`,
					};
					return mainAxios(originalRequest);
				});
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { accessToken, refreshToken } =
					await userService.refreshTokens();
				useAuthStore.getState().login(accessToken, refreshToken);

				// Додаємо токен до поточного запиту
				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${accessToken}`,
				};

				processQueue(null, accessToken);
				return mainAxios(originalRequest);
			} catch (refreshError) {
				const axiosError = refreshError as AxiosError;
				processQueue(axiosError, null);
				userService.logout();
				useAuthStore.getState().logout();
				return Promise.reject(axiosError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);
