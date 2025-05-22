import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const counterStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 15,
		width: 166,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	btn: {
		width: 46,
		height: 48,
		borderRadius: 1000,
		backgroundColor: COLORS.lightGray,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	increase: {
		backgroundColor: COLORS.primary,
	},
	btnText: {
		fontSize: 24,
		fontFamily: FONTS.bold,
		color: COLORS.white,
	},
	counterBox: {
		width: 46,
		height: 48,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	counterText: {
		fontSize: 16,
		fontFamily: FONTS.semiBold,
		color: COLORS.black,
	},
});
