import Toast from 'react-native-toast-message';
import { HandleToastProps } from './toast.interface';

export const toastMessage = ({ type, text1, text2 }: HandleToastProps) => {
	Toast.show({ type, text1, text2 });
};
