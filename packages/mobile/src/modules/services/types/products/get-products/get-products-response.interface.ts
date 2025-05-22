import { Product } from '../product-model';

export interface LoadProductsResponse {
	products: Product[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}
