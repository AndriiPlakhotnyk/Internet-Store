import styled from '@emotion/styled';
import { colors, fonts } from '~shared/styles';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	isError?: boolean;
};

export const StyledInput = styled.input<InputProps>`
	width: 100%;
	padding: 0.75rem 1rem;
	border: 1px solid
		${({ isError }) => (isError ? colors.error : colors.border)};
	border-radius: 4px;
	font-size: ${fonts.m};
	outline: none;

	&:focus {
		border-color: ${colors.secondary};
		box-shadow: 0 0 5px ${colors.secondary};
	}

	&:disabled {
		background: ${colors.disabledBackground};
		cursor: not-allowed;
	}
`;
