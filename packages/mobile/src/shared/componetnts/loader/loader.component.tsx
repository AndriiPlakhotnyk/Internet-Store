import { ActivityIndicator } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const Loader = () => {
	return <ActivityIndicator size="large" color={COLORS.black} />;
};
