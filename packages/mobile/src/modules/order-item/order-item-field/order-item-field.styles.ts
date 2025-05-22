import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const orderField = StyleSheet.create({
	title: {
		fontFamily: FONTS.bold,
		fontSize: 16,
		lineHeight: 25.6,
	},
	value: {
		fontFamily: FONTS.regular,
		fontSize: 16,
		lineHeight: 25.6,
	},
});
