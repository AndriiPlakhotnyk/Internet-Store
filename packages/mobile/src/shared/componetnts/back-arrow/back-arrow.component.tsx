import { TouchableOpacity } from 'react-native';
import { IconComponent } from '../icons-map';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/modules/navigation/types';
import { backArrowStyles } from './back-arrow.styles';

interface BackArrowIconProps {
	onPress?: () => void;
}

export const BackArrowIcon: React.FC<BackArrowIconProps> = ({ onPress }) => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const handlePress = () => {
		if (onPress) {
			onPress();
		} else {
			navigation.goBack();
		}
	};
	return (
		<TouchableOpacity onPress={handlePress} style={backArrowStyles.arrow}>
			<IconComponent name={'backArrow'} />
		</TouchableOpacity>
	);
};
