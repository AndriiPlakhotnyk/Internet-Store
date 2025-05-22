import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const verificationStyles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 70,
		backgroundColor: COLORS.background,
		alignItems: 'center',
		gap: 40,
		paddingBottom: 60,
	},
	title: {
		fontFamily: FONTS.bold,
		fontSize: 16,
		lineHeight: 25.6,
		textAlign: 'left',
		color: COLORS.black,
	},
	subtitle: {
		fontFamily: FONTS.medium,
		fontSize: 14,
		lineHeight: 22.4,
		textAlign: 'left',
		color: COLORS.gray,
	},
	codeInputContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	codeInput: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: COLORS.primary,
		borderRadius: 8,
		textAlign: 'center',
		fontSize: 25,
		lineHeight: 45,
	},
	focusCell: {
		borderBottomWidth: 2,
		borderBottomColor: COLORS.primary,
	},
});
