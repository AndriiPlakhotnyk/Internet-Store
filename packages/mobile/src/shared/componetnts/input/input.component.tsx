import React from 'react';
import { View, TextInput, Text } from 'react-native';
import { CustomInputProps } from './input.interface';
import { customInputStyles } from './input.styles';
import { TogglePasswordVisibility } from 'src/shared/componetnts/toggle-password-visibility';

export const CustomInput: React.FC<CustomInputProps> = ({
	label,
	placeholder,
	value,
	onChangeText,
	onBlur,
	secureTextEntry = false,
	error = false,
	errorMessage = '',
	togglePasswordVisibility = false,
	isPasswordVisible = false,
	onTogglePasswordVisibility = () => {},
	editable,
	grayBackground,
}) => {
	return (
		<View style={customInputStyles.container}>
			<Text style={customInputStyles.label}>{label}</Text>
			<View style={customInputStyles.inputContainer}>
				<TextInput
					style={[
						customInputStyles.input,
						error && customInputStyles.inputError,
						grayBackground && customInputStyles.grayBackground,
					]}
					placeholder={placeholder}
					value={value}
					onChangeText={onChangeText}
					onBlur={onBlur}
					secureTextEntry={!isPasswordVisible && secureTextEntry}
					editable={editable !== false}
				/>

				{togglePasswordVisibility && (
					<TogglePasswordVisibility
						isVisible={isPasswordVisible}
						onToggle={onTogglePasswordVisibility}
					/>
				)}
			</View>
			{error && errorMessage ? (
				<Text style={customInputStyles.errorMessage}>
					{errorMessage}
				</Text>
			) : null}
		</View>
	);
};
