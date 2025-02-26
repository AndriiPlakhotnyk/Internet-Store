import styled from '@emotion/styled';
import { colors, fonts } from '~shared/styles';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: ${colors.white};
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 0 10px ${colors.imperial};
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
`;

export const FieldWrapper = styled.div`
	width: 100%;
	margin-bottom: 1.5rem;
`;

export const Label = styled.label`
	display: block;
	font-size: ${fonts.m};
	color: ${colors.primary};
	margin-bottom: 0.5rem;
`;

export const ErrorMessage = styled.p`
	color: ${colors.error};
	font-size: ${fonts.s};
	margin-top: 0.25rem;
`;
