import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/shared/styles';

export const faqStyles = StyleSheet.create({
	wrapper: {
		marginBottom: 12,
		backgroundColor: COLORS.white,
		borderRadius: 0,
		overflow: 'hidden',
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 7,
	},
	question: {
		fontSize: 16,
		fontFamily: FONTS.medium,
		color: COLORS.black,
	},
	arrow: {
		fontSize: 24,
		color: COLORS.text,
	},
	answerContainer: {
		overflow: 'hidden',
		paddingBottom: 16,
	},
	answer: {
		fontSize: 16,
		color: COLORS.black,
		lineHeight: 20,
		fontFamily: FONTS.medium,
	},
});
