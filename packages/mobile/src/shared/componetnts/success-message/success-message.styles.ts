import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const successMessageStyled = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		padding: 77,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 40,
	},
	checkIcon: {
		width: 120,
		height: 120,
	},
	message: {
		fontFamily: 'Poppins',
		fontSize: 16,
		fontWeight: '400',
		lineHeight: 25.6,
		textAlign: 'center',
		color: '#000000',
	},
});
