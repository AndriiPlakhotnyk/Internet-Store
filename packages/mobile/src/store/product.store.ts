import { productService } from 'src/modules/auth/services/product.service';
import { create } from 'zustand';

interface Product {
	id: string;
	name: string;
	price: string;
	description: string;
	image: string;
}

interface ProductState {
	products: Product[];
	loadProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
	products: [],
	loadProducts: async () => {
		try {
			const response = await productService.getProducts();
			set({ products: response });
		} catch (error) {
			console.error('Error load products:', error);
		}
	},
}));
