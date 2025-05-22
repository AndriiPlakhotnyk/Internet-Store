import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const profileStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	title: {
		fontSize: 24,
		fontFamily: FONTS.bold,
		color: COLORS.text,
		alignSelf: 'center',
		marginBottom: 20,
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
	profileText: {
		fontSize: 16,
		color: COLORS.primary,
		fontFamily: FONTS.bold,
	},
});
