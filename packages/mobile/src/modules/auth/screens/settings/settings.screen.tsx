import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { styles } from './settings.styles';
import useAuthStore from './../../../../store/auth.store';

export const SettingsScreen: React.FC = () => {
	// const navigation = useNavigation();
	const { logout } = useAuthStore();

	return (
		<View style={styles.container}>
			{/* <TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('EditProfile')}
			>
				<Text style={styles.text}>Edit My Information</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('ResetPassword')}
			>
				<Text style={styles.text}>Reset Password</Text>
			</TouchableOpacity> */}

			<TouchableOpacity style={styles.logoutButton} onPress={logout}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};
