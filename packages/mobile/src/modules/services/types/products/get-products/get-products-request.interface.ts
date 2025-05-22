export interface LoadProductsRequest {
	page?: number;
	pageSize?: number;
	name?: string;
	sortBy?: 'asc' | 'desc';
}
