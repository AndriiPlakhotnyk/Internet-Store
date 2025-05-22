import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	login: (accessToken: string, refreshToken: string) => void;
	logout: () => void;
	updateTokens: (accessToken: string, refreshToken: string) => void;
	setAuthentication: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,

			login: (accessToken: string, refreshToken: string) =>
				set({ accessToken, refreshToken, isAuthenticated: true }),

			logout: () =>
				set({
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
				}),

			updateTokens: (accessToken: string, refreshToken: string) =>
				set({ accessToken, refreshToken }),

			setAuthentication: (isAuthenticated: boolean) =>
				set({ isAuthenticated }),
		}),
		{
			name: 'auth-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

export default useAuthStore;
