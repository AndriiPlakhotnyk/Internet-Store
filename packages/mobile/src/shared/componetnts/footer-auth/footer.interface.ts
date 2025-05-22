import { RootStackParamList } from 'src/modules/navigation/types';

export interface FooterProps<T extends keyof RootStackParamList> {
	message: string;
	linkText: string;
	route: T;
	paramObject?: RootStackParamList[T];
}
