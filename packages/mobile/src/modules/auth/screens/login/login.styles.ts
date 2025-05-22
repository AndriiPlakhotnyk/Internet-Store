import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
	container: {
		paddingTop: 120,
	},
	logo: {
		width: 245,
		height: 116.25,
		alignSelf: 'center',
		marginBottom: 20,
	},
	passwordContainer: {
		position: 'relative',
	},
	eyeIcon: {
		position: 'absolute',
		right: 10,
		top: '50%',
		transform: [{ translateY: -8 }],
	},
});
