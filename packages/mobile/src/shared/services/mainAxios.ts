import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import useAuthStore from 'src/store/auth.store';
import { HttpService } from './http.service';
import { refreshTokenFlow } from '../utils/refresh-token';

export const mainAxios = axios.create({
	baseURL: 'http://10.100.102.5:3030',
	withCredentials: true,
});
const httpClient = new HttpService(mainAxios);

mainAxios.interceptors.request.use((config) => {
	const accessToken = useAuthStore.getState().accessToken;

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (_: AxiosError | null, token: string | null) => {
	failedQueue.forEach((callback) => callback(token ?? ''));
	failedQueue = [];
};

mainAxios.interceptors.response.use(
	(response): AxiosResponse => response,
	async (error) => {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (originalRequest.url?.includes('/auth/logout')) {
				return Promise.reject(error);
			}

			originalRequest._retry = true;

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

			isRefreshing = true;

			try {
				const refreshToken = useAuthStore.getState().refreshToken;
				if (!refreshToken) {
					throw new Error('Refresh token is missing');
				}
				const response = await refreshTokenFlow(
					httpClient,
					refreshToken,
				);

				const newAccessToken = response.accessToken;
				const newRefreshToken = response.refreshToken;

				useAuthStore.getState().login(newAccessToken, newRefreshToken);

				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${newAccessToken}`,
				};

				processQueue(null, newAccessToken);
				return mainAxios(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as AxiosError, null);
				useAuthStore.getState().logout();
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	},
);
