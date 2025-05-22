import { Text } from 'react-native';
import { orderField } from './order-item-field.styles';

export const OrderField = ({
	title,
	value,
}: {
	title: string;
	value?: string | number;
}) => (
	<Text>
		<Text style={orderField.title}>{title}</Text>
		<Text style={orderField.value}>{value}</Text>
	</Text>
);
