import { EnhancedWithAuthHttpService } from 'src/shared/services/http-auth.service';
import { HttpFactoryService } from 'src/shared/services/http-factory.service';

interface Product {
	id: string;
	name: string;
	price: string;
	description: string;
	image: string;
}

export class ProductService {
	constructor(private readonly httpService: EnhancedWithAuthHttpService) {}

	public async getProducts(): Promise<Product[]> {
		try {
			const products = await this.httpService.get<Product[]>('/products');
			return products;
		} catch (error) {
			console.error('Error load products', error);
			throw error;
		}
	}

	public async getProductById(id: string): Promise<Product> {
		try {
			const product = await this.httpService.get<Product>(
				`/product-info/${id}`,
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
