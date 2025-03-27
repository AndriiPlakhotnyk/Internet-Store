import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { styles } from './settings.styles';
import useAuthStore from '../../store/auth.store';
import { userService } from '../services/user.service';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS, RootStackParamList } from '../navigation/types';

export const SettingsScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handleLogout = async () => {
		try {
			await userService.logout();
			useAuthStore.getState().logout();
		} catch (err) {
			console.error('Logout error:', err);
			const error = err as AxiosError<{ message: string }>;
			const errorMessage = error.response?.data?.message;

			Alert.alert('Error', errorMessage);
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate(NAVIGATION_KEYS.PROFILE)}
			>
				<Text style={styles.text}>Edit My Information</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() =>
					navigation.navigate(NAVIGATION_KEYS.RESET_PASSWORD)
				}
			>
				<Text style={styles.text}>Reset Password</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.logoutButton}
				onPress={handleLogout}
			>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};
