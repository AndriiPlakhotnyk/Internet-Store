import React from 'react';
import useAuthStore from '~store/auth.store';
import {
	Container,
	Header,
	LogoutButton,
	ProductItem,
	ProductList,
	ProductPrice,
	ProductTitle,
	Title,
} from './store-list.styles';

const StoreList: React.FC = () => {
	// Mocked component
	const products = [
		{ id: 1, name: 'Product 1', price: '$10' },
		{ id: 2, name: 'Product 2', price: '$15' },
		{ id: 3, name: 'Product 3', price: '$20' },
	];

	const handleLogout = () => {
		useAuthStore.getState().logout();
	};

	return (
		<Container>
			<Header>
				<Title>Store List</Title>
				<LogoutButton onClick={handleLogout}>Logout</LogoutButton>
			</Header>
			<ProductList>
				{products.map((product) => (
					<ProductItem key={product.id}>
						<ProductTitle>{product.name}</ProductTitle>
						<ProductPrice>Price: {product.price}</ProductPrice>
					</ProductItem>
				))}
			</ProductList>
		</Container>
	);
};

export default StoreList;
