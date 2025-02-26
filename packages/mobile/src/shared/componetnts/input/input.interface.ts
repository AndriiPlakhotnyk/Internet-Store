export interface CustomInputProps {
	label: string;
	placeholder: string;
	value: string;
	onChangeText: (text: string) => void;
	onBlur?: () => void;
	secureTextEntry?: boolean;
	error?: boolean;
	errorMessage?: string;
}
