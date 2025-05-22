import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const registerStyles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontFamily: FONTS.bold,
		color: COLORS.text,
		alignSelf: 'center',
		marginBottom: 20,
	},
	passwordContainer: {
		position: 'relative',
	},
});
