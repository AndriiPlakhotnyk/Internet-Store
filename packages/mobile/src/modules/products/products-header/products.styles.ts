import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const headerStyles = StyleSheet.create({
	header: {
		paddingTop: 20,
		alignItems: 'center',
	},
	headerText: {
		fontSize: 24,
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	searchContainer: {
		backgroundColor: COLORS.white,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.lightGray,
		padding: 12,
		marginBottom: 20,
	},
	searchInput: {
		fontSize: 16,
		fontFamily: FONTS.bold,
		color: COLORS.black,
	},
	buttonPanel: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10,
	},
});
