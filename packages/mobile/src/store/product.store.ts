import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Product } from 'src/modules/services/types/products/product-model';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProductState {
	searchTerm: string;
	sortOrder?: 'asc' | 'desc';
	page: number;
	products: Product[];
	totalPages: number;

	setSearchTerm: (term: string) => void;
	setSortOrder: (order?: 'asc' | 'desc') => void;
	setPage: (page: number) => void;
	setProducts: (products: Product[], reset?: boolean) => void;
	setTotalPages: (total: number) => void;
	reset: () => void;
}

export const useProductStore = create<ProductState>()(
	persist(
		(set) => ({
			searchTerm: '',
			sortOrder: undefined,
			page: 1,
			products: [],
			totalPages: 1,

			setSearchTerm: (term) => set({ searchTerm: term }),
			setSortOrder: (order) => set({ sortOrder: order }),
			setPage: (page) => set({ page }),
			setProducts: (products, reset = false) =>
				set((state) => ({
					products: reset
						? products
						: [...state.products, ...products].filter(
								(product, i, self) =>
									i ===
									self.findIndex((p) => p.id === product.id),
							),
				})),
			setTotalPages: (totalPages) => set({ totalPages }),
			reset: () =>
				set({
					searchTerm: '',
					sortOrder: undefined,
					page: 1,
					products: [],
					totalPages: 1,
				}),
		}),
		{
			name: 'product-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
