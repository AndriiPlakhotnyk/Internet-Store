import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { togglePassVisibilityStyles } from './toggle-password-visibility.styles';
import { COLORS } from 'src/shared/styles';

export interface TogglePasswordVisibilityProps {
	isVisible: boolean;
	onToggle(value: boolean): void;
}

export const TogglePasswordVisibility: React.FC<
	TogglePasswordVisibilityProps
> = ({ isVisible, onToggle }) => {
	return (
		<View style={togglePassVisibilityStyles.container}>
			<TouchableOpacity onPress={() => onToggle(!isVisible)}>
				<Ionicons
					name={isVisible ? 'eye' : 'eye-off'}
					size={24}
					color={COLORS.primary}
				/>
			</TouchableOpacity>
		</View>
	);
};
