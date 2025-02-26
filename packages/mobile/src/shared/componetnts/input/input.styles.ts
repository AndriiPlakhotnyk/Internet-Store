import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const customInputStyles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		color: COLORS.text,
		marginBottom: 8,
		fontFamily: FONTS.medium,
	},
	input: {
		height: 48,
		borderColor: COLORS.border,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
		fontFamily: FONTS.regular,
		color: COLORS.text,
		backgroundColor: COLORS.white,
	},
	inputError: {
		borderColor: COLORS.error,
	},
	errorMessage: {
		fontSize: 12,
		color: COLORS.error,
		marginTop: 4,
		fontFamily: FONTS.regular,
	},
});
