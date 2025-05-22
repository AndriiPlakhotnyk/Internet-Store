import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const headerStyles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 16,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 24,
		fontFamily: FONTS.bold,
		color: COLORS.black,
		marginLeft: 12,
	},
	leftContainer: {
		paddingLeft: 0,
		width: 40,
	},

	rightContainer: {
		paddingRight: 0,
		alignItems: 'flex-end',
		justifyContent: 'center',
		width: 40,
	},

	centerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
