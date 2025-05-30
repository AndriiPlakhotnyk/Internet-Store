export interface CustomInputProps {
	label?: string;
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	secureTextEntry?: boolean;
	error?: boolean;
	errorMessage?: string;
	togglePasswordVisibility?: boolean;
	isPasswordVisible?: boolean;
	onTogglePasswordVisibility?: () => void;
	editable?: boolean;
	grayBackground?: boolean;
}
