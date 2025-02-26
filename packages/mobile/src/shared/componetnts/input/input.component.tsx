import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { CustomInputProps } from './input.interface';
import { customInputStyles } from './input.styles';

export const CustomInput: React.FC<CustomInputProps> = ({
	label,
	placeholder,
	value,
	onChangeText,
	onBlur,
	secureTextEntry = false,
	error = false,
	errorMessage = '',
}) => {
	return (
		<View style={customInputStyles.container}>
			<Text style={customInputStyles.label}>{label}</Text>
			<TextInput
				style={[
					customInputStyles.input,
					error && customInputStyles.inputError,
				]}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				onBlur={onBlur}
				secureTextEntry={secureTextEntry}
			/>
			{error && errorMessage ? (
				<Text style={customInputStyles.errorMessage}>
					{errorMessage}
				</Text>
			) : null}
		</View>
	);
};
