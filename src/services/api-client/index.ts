import { statusCodes } from '@utils/constants';
import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 20000
});

apiClient.interceptors.request.use(
	async function (config) {
		return config;
	},
	function (error: AxiosError) {
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error: AxiosError) {
		statusCodes;

		return Promise.reject(error);
	}
);
