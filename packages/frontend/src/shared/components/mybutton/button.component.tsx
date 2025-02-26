import React from 'react';
import { StyledButton, ButtonProps } from './button.styles';

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	...props
}) => <StyledButton variant={variant} {...props} />;
