import axios from 'axios';

export const mainAxios = axios.create({
	baseURL: 'http://10.100.102.9:3030',
	withCredentials: true,
});
