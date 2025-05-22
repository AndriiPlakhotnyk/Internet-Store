import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const labelStyles = StyleSheet.create({
	labelBlock: {
		width: '100%',
	},
	labelTitle: {
		fontFamily: FONTS.semiBold,
		fontSize: 16,
		lineHeight: 26,
		color: COLORS.black,
	},
	labelValue: {
		fontFamily: FONTS.regular,
		fontSize: 16,
		lineHeight: 26,
		color: COLORS.black,
	},
});
