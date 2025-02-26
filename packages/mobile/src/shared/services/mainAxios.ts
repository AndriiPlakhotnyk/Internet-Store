import type { AxiosResponse } from 'axios';
import axios from 'axios';
import useAuthStore from 'src/store/auth.store';

export const mainAxios = axios.create({
	baseURL: 'http://10.100.102.9:3030',
	withCredentials: true,
});

mainAxios.interceptors.response.use(
	(response): AxiosResponse => {
		return response;
	},
	async (error) => {
		if (Boolean(error.response) && error.response.status === 401) {
			useAuthStore.getState().setAuthentication(false);
		}
		return Promise.reject(error);
	},
);
