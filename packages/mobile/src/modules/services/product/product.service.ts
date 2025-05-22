import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';
import { Product } from './types/products/product-model';
import {
	LoadProductsRequest,
	LoadProductsResponse,
} from './types/products/get-products';

class ProductService {
	constructor(
		private readonly authHttpService: EnhancedWithAuthHttpService,
	) {}

	async loadProducts({
		page = 1,
		pageSize = 10,
		name,
		sortBy,
	}: LoadProductsRequest): Promise<LoadProductsResponse> {
		try {
			const rawQueryParams: Record<string, string | undefined> = {
				page: String(page),
				pageSize: String(pageSize),
				name,
				sortBy,
			};

			const queryParams = Object.fromEntries(
				Object.entries(rawQueryParams).filter(
					([, value]) => value !== undefined && value !== '',
				),
			);

			const queryUrl = this.authHttpService.createQueryLink(
				'product/products',
				queryParams,
			);

			const response =
				await this.authHttpService.get<LoadProductsResponse>(queryUrl);
			return response;
		} catch (error) {
			console.error('Error loading products', error);
			throw error;
		}
	}

	async getProductById(productId: string): Promise<Product> {
		try {
			const product = await this.authHttpService.get<Product>(
				`product/product/${productId}`,
			);
			return product;
		} catch (error) {
			console.error('Error to get product', error);
			throw error;
		}
	}
}

export const productService = new ProductService(
	new HttpFactoryService().createAuthHttpService(),
);
