import { StyleSheet } from 'react-native';

export const togglePassVisibilityStyles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 10,
		top: '50%',
		transform: [{ translateY: -12 }],
	},
});
