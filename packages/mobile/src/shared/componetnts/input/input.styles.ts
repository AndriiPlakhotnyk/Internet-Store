import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const customInputStyles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		color: COLORS.gray,
		marginBottom: 8,
		fontFamily: FONTS.medium,
	},
	inputContainer: {
		position: 'relative',
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
		width: '100%',
	},
	inputError: {
		borderColor: COLORS.red,
	},
	errorMessage: {
		fontSize: 12,
		color: COLORS.red,
		marginTop: 4,
		fontFamily: FONTS.regular,
	},
	grayBackground: {
		backgroundColor: COLORS.lightGray,
	},
});
