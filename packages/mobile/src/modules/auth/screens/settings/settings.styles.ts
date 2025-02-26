import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	button: {
		width: '80%',
		padding: 15,
		backgroundColor: '#007bff',
		borderRadius: 5,
		marginBottom: 10,
		alignItems: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	logoutButton: {
		width: '80%',
		padding: 15,
		backgroundColor: 'red',
		borderRadius: 5,
		marginTop: 20,
		alignItems: 'center',
	},
	logoutText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
