// // bottom-modal.component.tsx
// import React, { forwardRef } from 'react';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import {
// 	View,
// 	Text,
// 	TouchableOpacity,
// 	FlatList,
// 	StyleSheet,
// } from 'react-native';

// interface FilterBottomSheetProps<T extends string> {
// 	title: string;
// 	options: T[];
// 	selectedValue: T;
// 	onSelect: (val: T) => void;
// }

// export const FilterBottomSheet = forwardRef(
// 	<Val extends string>(
// 		{
// 			title,
// 			options,
// 			selectedValue,
// 			onSelect,
// 		}: FilterBottomSheetProps<Val>,
// 		ref: React.Ref<BottomSheetModal>,
// 	) => {
// 		return (
// 			<BottomSheetModal
// 				ref={ref}
// 				index={0}
// 				snapPoints={['40%']}
// 				backgroundStyle={styles.sheetContainer}
// 			>
// 				<View style={styles.content}>
// 					<Text style={styles.title}>{title}</Text>
// 					<FlatList
// 						data={options}
// 						showsVerticalScrollIndicator={false}
// 						keyExtractor={(item: Val) => item.toString()}
// 						renderItem={({ item }: { item: Val }) => (
// 							<TouchableOpacity
// 								style={[
// 									styles.optionButton,
// 									item === selectedValue &&
// 										styles.selectedOption,
// 								]}
// 								onPress={() => {
// 									onSelect(item);
// 									(
// 										ref as React.RefObject<BottomSheetModal>
// 									)?.current?.dismiss();
// 								}}
// 							>
// 								<Text
// 									style={[
// 										styles.optionText,
// 										item === selectedValue &&
// 											styles.selectedText,
// 									]}
// 								>
// 									{item}
// 								</Text>
// 							</TouchableOpacity>
// 						)}
// 					/>
// 				</View>
// 			</BottomSheetModal>
// 		);
// 	},
// );

// const styles = StyleSheet.create({
// 	sheetContainer: {
// 		borderRadius: 16,
// 		backgroundColor: '#fff',
// 	},
// 	content: {
// 		flex: 1,
// 		padding: 16,
// 	},
// 	title: {
// 		fontSize: 18,
// 		fontWeight: '600',
// 		marginBottom: 12,
// 	},
// 	optionButton: {
// 		paddingVertical: 12,
// 		paddingHorizontal: 16,
// 		borderRadius: 8,
// 		borderWidth: 1,
// 		borderColor: '#ddd',
// 		marginBottom: 8,
// 	},
// 	selectedOption: {
// 		backgroundColor: '#e0f7e9',
// 		borderColor: '#52c29d',
// 	},
// 	optionText: {
// 		fontSize: 16,
// 		color: '#333',
// 	},
// 	selectedText: {
// 		color: '#2d8659',
// 		fontWeight: 'bold',
// 	},
// });
