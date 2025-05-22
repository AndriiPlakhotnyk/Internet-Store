import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const buttonStyles = StyleSheet.create({
	button: {
		width: 156,
		height: 26,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	text: {
		fontFamily: FONTS.bold,
		fontSize: 30,
		lineHeight: 26,
		textAlign: 'center',
		color: COLORS.white,
	},
});
