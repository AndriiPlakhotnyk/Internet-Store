import type { IHttpClient } from './types';
import type { IHttpConfig, IMap, IResponse } from './types';

// const QUERY_LINK_OFFSET = 0;

const SERVER_URL = process.env.EXPO_PUBLIC_BASE_URLL ?? '';

export class HttpService {
	constructor(
		private readonly fetchingService: IHttpClient,
		private readonly baseUrl: string = SERVER_URL,
	) {
		this.fetchingService = fetchingService;
		this.baseUrl = baseUrl;
	}

	public createQueryLink(url: string, args: IMap): string {
		const queryParams = Object.entries(args)
			.filter(([_, v]) => v !== undefined && v !== '')
			.map(
				([k, v]) =>
					`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
			)
			.join('&');

		const finalUrl = `${url}?${queryParams}`;
		return finalUrl;
	}

	public async get<T>(url: string, config?: IHttpConfig): Promise<T> {
		return this.fetchingService
			.get<IResponse<T>>(this.getFullApiUrl(url), {
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			})
			.then((result) => {
				this.checkResponseStatus(result);
				return result.data;
			});
	}

	public async post<T, TD>(
		url: string,
		data: TD,
		config?: IHttpConfig,
	): Promise<T> {
		return this.fetchingService
			.post<IResponse<T>, TD>(this.getFullApiUrl(url), data, {
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			})
			.then((result) => {
				this.checkResponseStatus(result);
				return result.data;
			});
	}

	public async put<T, TD>(
		url: string,
		data: TD,
		config?: IHttpConfig,
	): Promise<T> {
		return this.fetchingService
			.put<IResponse<T>, TD>(this.getFullApiUrl(url), data, {
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			})
			.then((result) => {
				this.checkResponseStatus(result);
				return result.data;
			});
	}

	public async patch<T, TD>(
		url: string,
		data: TD,
		config?: IHttpConfig,
	): Promise<T> {
		return this.fetchingService
			.patch<IResponse<T>, TD>(this.getFullApiUrl(url), data, {
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			})
			.then((result) => {
				this.checkResponseStatus(result);
				return result.data;
			});
	}

	public async delete<T>(url: string, config?: IHttpConfig): Promise<T> {
		return this.fetchingService
			.delete<IResponse<T>>(this.getFullApiUrl(url), {
				...config,
				headers: {
					...config?.headers,
					...this.populateContentTypeHeaderConfig(),
				},
			})
			.then((result) => {
				this.checkResponseStatus(result);
				return result.data;
			});
	}

	public populateContentTypeHeaderConfig(): Record<string, string> {
		return {
			'Content-Type': 'application/json',
		};
	}

	private getFullApiUrl(url: string): string {
		return `${this.baseUrl}/${url}`;
	}

	private async checkResponseStatus<T>(result: IResponse<T>): Promise<void> {
		if (result.status >= 400 && result.status < 600) {
			const errorData = {
				response: {
					status: result.status,
					data: result.data,
				},
			};

			throw new Error(JSON.stringify(errorData));
		}
	}
}
