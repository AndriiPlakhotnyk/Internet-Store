import { View, Text, Pressable } from 'react-native';
import { detailItemStyles } from './cart-item.styles';
import { DetailItemProps } from './cart-item.interfeace';
import { TrashIcon } from 'src/shared/componetnts/trash-icon';

export const DetailItem: React.FC<DetailItemProps> = ({
	name,
	total,
	amount,
	onPress,
	onDelete,
}) => {
	return (
		<View style={detailItemStyles.productItem}>
			<Pressable
				style={detailItemStyles.productDetails}
				onPress={onPress}
			>
				<Text style={detailItemStyles.productName}>{name}</Text>

				<View style={detailItemStyles.detailsRow}>
					<View style={detailItemStyles.detailBox}>
						<Text style={detailItemStyles.label}>Total:</Text>
						<Text style={detailItemStyles.value}> ${total}</Text>
					</View>

					<View style={detailItemStyles.detailBox}>
						<Text style={detailItemStyles.label}>Amount:</Text>
						<Text style={detailItemStyles.value}> {amount}</Text>
					</View>
				</View>
			</Pressable>

			{onDelete && (
				<View style={detailItemStyles.trashContainer}>
					<TrashIcon onPress={onDelete} />
				</View>
			)}
		</View>
	);
};
