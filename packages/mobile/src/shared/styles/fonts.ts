import { useFonts } from 'expo-font';

export const FONTS = Object.freeze({
	regular: 'Poppins-Regular',
	medium: 'Poppins-Medium',
	semiBold: 'Poppins-SemiBold',
	bold: 'Poppins-Bold',
	black: 'Poppins-Black',
});

export const loadFonts = () => {
	return useFonts({
		'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
		'Poppins-Medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
		'Poppins-SemiBold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
		'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
		'Poppins-Black': require('../../../assets/fonts/Poppins-Black.ttf'),
	});
};
