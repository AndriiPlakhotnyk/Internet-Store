import { View, Text } from 'react-native';
import { emptyStyles } from './empty.styles';

interface EmptyScreenProps {
	text: string;
}

export const EmptyScreen = ({ text }: EmptyScreenProps) => {
	return (
		<View style={emptyStyles.container}>
			<Text style={emptyStyles.text}>{text}</Text>
		</View>
	);
};
