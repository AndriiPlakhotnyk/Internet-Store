import styled from '@emotion/styled';
import { colors, fonts } from '~shared/styles';

export const Container = styled.div`
	padding: 1rem;
	background-color: ${colors.pageBackground};
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const Title = styled.h1`
	margin: 0;
	color: ${colors.primary};
	font-size: ${fonts.l};
`;

export const LogoutButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: ${colors.error};
	color: ${colors.textOnPrimary};
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: ${fonts.m};

	&:hover {
		background-color: ${colors.medium_violet_red};
	}

	&:disabled {
		background-color: ${colors.disabledBackground};
		cursor: not-allowed;
	}
`;

export const ProductList = styled.ul`
	list-style: none;
	padding: 0;
`;

export const ProductItem = styled.li`
	border: 1px solid ${colors.border};
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	border-radius: 4px;
	background-color: ${colors.white};
`;

export const ProductTitle = styled.h2`
	margin: 0 0 0.5rem 0;
	color: ${colors.primary};
	font-size: ${fonts.m};
`;

export const ProductPrice = styled.p`
	margin: 0;
	color: ${colors.secondaryDark};
	font-size: ${fonts.s};
`;
