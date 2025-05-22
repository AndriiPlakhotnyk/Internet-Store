import { StyleSheet } from 'react-native';
import { FONTS } from 'src/shared/styles';

export const orderDetailsStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		marginTop: 10,
		marginBottom: 20,
		fontSize: 16,
		fontFamily: FONTS.semiBold,
		textAlign: 'center',
	},
});
