import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const emptyStyles = StyleSheet.create({
	container: {
		padding: 100,
		alignItems: 'center',
	},
	text: {
		fontFamily: FONTS.bold,
	},
});
