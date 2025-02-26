import React from 'react';
import { StyledInput, InputProps } from './input.styles';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ isError, ...props }, ref) => (
		<StyledInput ref={ref} isError={isError} {...props} />
	),
);

Input.displayName = 'Input';
