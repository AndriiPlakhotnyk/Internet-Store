import React from 'react';
import { privateRoutes, publicRoutes } from './routes';
import useAuthStore from '~store/auth.store';

export const MainRouter: React.FC = () => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return <>{isAuthenticated ? privateRoutes : publicRoutes}</>;
};
