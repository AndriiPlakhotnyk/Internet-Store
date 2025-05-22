import { View } from 'react-native';
import { getIcon, IconsMap } from './icons-map.config';

export const IconComponent = ({
	name,
	style,
}: {
	name: keyof typeof IconsMap;
	style?: object;
}) => {
	const Icon = getIcon(name);

	return (
		<View style={style}>
			<Icon />
		</View>
	);
};
