import { View, Text } from 'react-native';
import { labelStyles } from './label.styles';

export const Label = ({
	title,
	value,
}: {
	title: string;
	value?: string | number;
}) => (
	<View style={labelStyles.labelBlock}>
		<Text style={labelStyles.labelTitle}>{title}</Text>
		<Text style={labelStyles.labelValue}>{value}</Text>
	</View>
);
