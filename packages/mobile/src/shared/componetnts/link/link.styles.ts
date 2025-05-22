import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const linkStyles = StyleSheet.create({
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
	footerLinkText: {
		fontSize: 16,
		color: COLORS.primary,
		fontFamily: FONTS.bold,
	},
});
