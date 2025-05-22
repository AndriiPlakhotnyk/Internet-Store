import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

type CartItem = {
	name: string;
	id: string;
	description: string;
	inStock: number;
	price: number;
	category: string;
	amount: number;
};

type CartState = {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: string) => void;
	clearCart: () => void;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cart: [],
			addToCart: (newItem) =>
				set((state) => {
					const existingItemIndex = state.cart.findIndex(
						(item) => item.id === newItem.id,
					);

					if (existingItemIndex !== -1) {
						const updatedCart = [...state.cart];
						updatedCart[existingItemIndex] = {
							...updatedCart[existingItemIndex],
							amount: newItem.amount,
						};
						return { cart: updatedCart };
					}

					return { cart: [...state.cart, newItem] };
				}),

			removeFromCart: (id) => {
				set({ cart: get().cart.filter((item) => item.id !== id) });
			},
			clearCart: () => set({ cart: [] }),
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
