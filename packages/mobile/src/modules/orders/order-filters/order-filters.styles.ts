import { StyleSheet } from 'react-native';

export const orderFilterStyles = StyleSheet.create({
	filtersRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		marginVertical: 12,
		paddingHorizontal: 10,
	},
	filterButton: {
		backgroundColor: '#f0f0f0',
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	filterButtonText: {
		color: '#333',
		fontWeight: '500',
	},
});
