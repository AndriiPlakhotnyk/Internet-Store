import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const footerStyles = StyleSheet.create({
	footer: {
		flexDirection: 'row',
		width: '100%',
		height: 100,
		backgroundColor: COLORS.white,
		borderTopWidth: 1,
		borderColor: COLORS.lightGray,
		paddingBottom: 10,
		alignItems: 'center',
	},
	tabItem: {
		flex: 1,
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: COLORS.lightGray,
		paddingVertical: 10,
		gap: 6,
	},
	tabText: {
		fontSize: 16,
		fontFamily: FONTS.regular,
		color: COLORS.black,
	},
	activeText: {
		fontSize: 16,
		color: COLORS.primary,
		fontFamily: FONTS.regular,
	},
});
