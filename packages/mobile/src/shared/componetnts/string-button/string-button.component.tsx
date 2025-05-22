import { Text, TouchableOpacity, TextStyle } from 'react-native';

interface ButtonProps {
	text: string;
	color: string;
	onPress: () => void;
	fontFamily?: TextStyle['fontFamily'];
}

export const StringButton: React.FC<ButtonProps> = ({
	text,
	color,
	onPress,
	fontFamily,
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text
				style={{
					color,
					fontSize: 16,
					fontFamily,
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
};
