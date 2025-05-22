import { View, Pressable } from 'react-native';
import { IconComponent } from '../icons-map';
import { trashStyles } from './trash-icon.styles';

interface TrashProps {
	onPress: () => void;
}

export const TrashIcon: React.FC<TrashProps> = ({ onPress }) => {
	return (
		<Pressable style={trashStyles.container} onPress={onPress}>
			<View style={trashStyles.iconWrapper}>
				<IconComponent name="trash" />
			</View>
		</Pressable>
	);
};
