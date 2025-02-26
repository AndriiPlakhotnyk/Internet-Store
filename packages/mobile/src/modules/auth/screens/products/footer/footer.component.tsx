import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './footer.styles';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Footer: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	return (
		<View style={styles.footer}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate(NAVIGATION_KEYS.PRODUCTS)}
			>
				<Text style={styles.text}>Products</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate(NAVIGATION_KEYS.ORDERS)}
			>
				<Text style={styles.text}>Orders</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate(NAVIGATION_KEYS.SETTINGS)}
			>
				<Text style={styles.text}>Settings</Text>
			</TouchableOpacity>
		</View>
	);
};
