import React, { useState, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { CustomButton } from 'src/shared/componetnts/button';
import { styles } from './verification-code.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { authService } from 'src/modules/auth/services/auth.service';

export const VerificationCodeScreen: React.FC = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const route =
		useRoute<RouteProp<RootStackParamList, NAVIGATION_KEYS.VERIFY_CODE>>();
	const email = route.params?.email;

	const [code, setCode] = useState<string[]>(Array(4).fill(''));

	const inputRefs = useRef<(TextInput | null)[]>([]);

	const handleCodeChange = (value: string, index: number) => {
		const updatedCode = [...code];
		updatedCode[index] = value;
		setCode(updatedCode);

		if (value && index < 3) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleButton = async () => {
		const verificationCode = code.join('');
		if (email && verificationCode.length === 4) {
			try {
				await authService.verifyOtp(email, verificationCode);
				navigation.navigate(NAVIGATION_KEYS.SUCCESS_VERIFICATION);
			} catch (error) {
				console.error('Verification failed:', error);
			}
		} else {
			console.warn('Please enter a valid code');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Email Verification</Text>
			<Text style={styles.subtitle}>
				Please type the code from the email
			</Text>
			<View style={styles.codeInputContainer}>
				{Array.from({ length: 4 }).map((_, index) => (
					<TextInput
						key={index}
						style={styles.codeInput}
						maxLength={1}
						keyboardType="numeric"
						value={code[index]}
						onChangeText={(value) => handleCodeChange(value, index)}
						ref={(ref) => (inputRefs.current[index] = ref)}
					/>
				))}
			</View>
			<CustomButton title="Submit" onPress={handleButton} />
		</View>
	);
};
