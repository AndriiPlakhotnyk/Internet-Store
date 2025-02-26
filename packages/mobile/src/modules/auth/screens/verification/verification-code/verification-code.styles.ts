import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
		padding: 77,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 40,
	},
	title: {
		fontFamily: 'Poppins',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 25.6,
		textAlign: 'left',
		color: '#000000',
	},
	subtitle: {
		fontFamily: 'Inter',
		fontSize: 14,
		fontWeight: '500',
		lineHeight: 22.4,
		textAlign: 'left',
		color: '#777777',
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
		fontSize: 18,
	},
});
