import styled from '@emotion/styled';
import { colors, fonts } from '~shared/styles';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary';
};

export const StyledButton = styled.button<ButtonProps>`
	background: ${({ variant }) =>
		variant === 'secondary' ? colors.secondary : colors.primary};
	color: ${colors.textOnPrimary};
	font-size: ${fonts.m};
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	transition: background 0.3s;

	&:hover {
		background: ${({ variant }) =>
			variant === 'secondary' ? colors.secondaryDark : colors.primary};
	}

	&:disabled {
		background: ${colors.disabledBackground};
		cursor: not-allowed;
	}
`;
