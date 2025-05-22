import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const basketStyles = StyleSheet.create({
	container: {
		position: 'relative',
		padding: 5,
	},
	badge: {
		position: 'absolute',
		bottom: 1,
		right: -4,
		width: 19,
		height: 19.78,
		borderRadius: 678.57,
		backgroundColor: COLORS.red,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 3.39,
		paddingHorizontal: 6.79,
	},
	badgeText: {
		color: COLORS.white,
		fontSize: 8.14,
		fontFamily: FONTS.regular,
		lineHeight: 13,
		textAlign: 'center',
	},
});
