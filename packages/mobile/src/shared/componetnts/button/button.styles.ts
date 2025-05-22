import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const buttonStyles = StyleSheet.create({
	button: {
		width: '100%',
		height: 43,
		backgroundColor: COLORS.primary,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	buttonDisabled: {
		backgroundColor: COLORS.gray,
	},
	buttonText: {
		color: COLORS.white,
		fontSize: 16,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		marginRight: 8,
	},
});
