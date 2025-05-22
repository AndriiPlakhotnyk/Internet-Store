import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const layoutStyles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 13,
		paddingTop: 40,
		paddingBottom: 20,
		backgroundColor: COLORS.background,
		justifyContent: 'space-between',
	},
});
