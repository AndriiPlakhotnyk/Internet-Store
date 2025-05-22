import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from 'src/modules/services/types/order';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type PaymentFilter = 'All' | 'Pending' | 'Complete' | 'Failed';
export type DeliveryFilter = 'All' | 'Pending' | 'InTransit' | 'Delivered';
export type DateSort = 'asc' | 'desc';

interface OrderStore {
	orders: Order[];
	payment: PaymentFilter;
	delivery: DeliveryFilter;
	dateSort: DateSort;
	setOrders: (orders: Order[]) => void;
	addOrder: (order: Order) => void;
	clearOrders: () => void;
	setPayment: (val: PaymentFilter) => void;
	setDelivery: (val: DeliveryFilter) => void;
	setDateSort: (val: DateSort) => void;
	resetFilters: () => void;
}

export const useOrderStore = create<OrderStore>()(
	persist(
		(set) => ({
			orders: [],
			payment: 'All',
			delivery: 'All',
			dateSort: 'desc',
			setOrders: (orders) => set({ orders }),
			addOrder: (order) =>
				set((state) => ({ orders: [...state.orders, order] })),
			clearOrders: () => set({ orders: [] }),
			setPayment: (val) => set({ payment: val }),
			setDelivery: (val) => set({ delivery: val }),
			setDateSort: (val) => set({ dateSort: val }),
			resetFilters: () =>
				set({ payment: 'All', delivery: 'All', dateSort: 'desc' }),
		}),
		{
			name: 'order-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
