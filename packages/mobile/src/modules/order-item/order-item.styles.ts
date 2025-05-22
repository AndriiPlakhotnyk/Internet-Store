import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const orderItem = StyleSheet.create({
	container: {
		width: 374,
		height: 212,
		padding: 10,
		borderWidth: 1,
		borderColor: COLORS.gray,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
		marginBottom: 20,
	},
});
