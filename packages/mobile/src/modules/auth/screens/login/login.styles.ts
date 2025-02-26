import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const loginStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: COLORS.background,
		justifyContent: 'center',
	},
	logo: {
		width: 245,
		height: 116.25,
		alignSelf: 'center',
		marginBottom: 20,
	},
	formField: {
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		color: COLORS.text,
		marginBottom: 8,
		fontFamily: FONTS.regular,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
	},
	footerText: {
		fontSize: 16,
		color: COLORS.text,
		fontFamily: FONTS.regular,
	},
	signupText: {
		fontSize: 16,
		color: COLORS.primary,
		fontFamily: FONTS.bold,
	},
});
