import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const successMessageStyled = StyleSheet.create({
	containerIcon: {
		flex: 1,
		backgroundColor: COLORS.background,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 130,
		gap: 30,
		width: '100%',
	},
	checkIcon: {
		width: 120,
		height: 120,
	},
	messageContainer: {
		width: '100%',
		paddingHorizontal: 20,
		alignItems: 'center',
	},
	message: {
		fontFamily: FONTS.regular,
		fontSize: 16,
		textAlign: 'center',
		color: COLORS.text,
	},
});
