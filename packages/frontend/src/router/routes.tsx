import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import StoreList from '~/pages/store-list/store-list.component';
import LoginPage from '../pages/login/login-page.component';
import { ROUTER_KEYS } from '~shared/keys';

export const publicRoutes = (
	<Routes>
		<Route path={ROUTER_KEYS.LOGIN} element={<LoginPage />} />
		<Route
			path={ROUTER_KEYS.ALL_MATCH}
			element={<Navigate to={ROUTER_KEYS.LOGIN} />}
		/>
	</Routes>
);

export const privateRoutes = (
	<Routes>
		<Route path={ROUTER_KEYS.DASHBOARD} element={<StoreList />} />
		<Route
			path={ROUTER_KEYS.ALL_MATCH}
			element={<Navigate to={ROUTER_KEYS.DASHBOARD} />}
		/>
	</Routes>
);
