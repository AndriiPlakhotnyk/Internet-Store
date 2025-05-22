import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const productStyles = StyleSheet.create({
	productItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		height: 82,
		borderColor: COLORS.gray,
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
	},
	productDetails: {
		width: 200,
		justifyContent: 'space-between',
	},
	productName: {
		fontSize: 16,
		fontFamily: FONTS.regular,
		color: COLORS.black,
	},
	productCategory: {
		fontSize: 16,
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	label: {
		fontSize: 16,
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	value: {
		fontSize: 16,
		fontFamily: FONTS.regular,
		color: COLORS.black,
	},
});
