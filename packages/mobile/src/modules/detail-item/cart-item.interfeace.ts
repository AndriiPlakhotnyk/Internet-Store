export interface DetailItemProps {
	name: string;
	total: number;
	amount: number;
	onPress: () => void;
	onDelete?: () => void;
}
