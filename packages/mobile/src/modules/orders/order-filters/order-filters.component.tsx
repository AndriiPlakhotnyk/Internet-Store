// import React, { useRef } from 'react';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { orderFilterStyles } from './order-filters.styles';
// import { FilterBottomSheet } from './bottom-modal';
// import {
// 	DateSort,
// 	DeliveryFilter,
// 	PaymentFilter,
// 	useOrderStore,
// } from 'src/store/order.store';
// import { BottomSheetModal } from '@gorhom/bottom-sheet';

// export const OrderFilter = () => {
// 	const {
// 		payment,
// 		delivery,
// 		dateSort,
// 		setPayment,
// 		setDelivery,
// 		setDateSort,
// 	} = useOrderStore();

// 	const paymentRef = useRef<BottomSheetModal>(null);
// 	const deliveryRef = useRef<BottomSheetModal>(null);
// 	const dateRef = useRef<BottomSheetModal>(null);

// 	const paymentOptions = ['All', 'Pending', 'Complete', 'Failed'];
// 	const deliveryOptions = ['All', 'Pending', 'InTransit', 'Delivered'];
// 	const dateSortOptions = ['asc', 'desc'];

// 	return (
// 		<>
// 			<View style={orderFilterStyles.filtersRow}>
// 				<TouchableOpacity
// 					style={orderFilterStyles.filterButton}
// 					onPress={() => paymentRef.current?.present()}
// 				>
// 					<Text style={orderFilterStyles.filterButtonText}>
// 						Payment: {payment}
// 					</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity
// 					style={orderFilterStyles.filterButton}
// 					onPress={() => deliveryRef.current?.present()}
// 				>
// 					<Text style={orderFilterStyles.filterButtonText}>
// 						Delivery: {delivery}
// 					</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity
// 					style={orderFilterStyles.filterButton}
// 					onPress={() => dateRef.current?.present()}
// 				>
// 					<Text style={orderFilterStyles.filterButtonText}>
// 						Date: {dateSort === 'asc' ? 'Asc' : 'Desc'}
// 					</Text>
// 				</TouchableOpacity>
// 			</View>

// 			<FilterBottomSheet<PaymentFilter>
// 				ref={paymentRef}
// 				title="Payment Status"
// 				options={paymentOptions}
// 				selectedValue={payment}
// 				onSelect={setPayment}
// 			/>

// 			<FilterBottomSheet<DeliveryFilter>
// 				ref={deliveryRef}
// 				title="Delivery Status"
// 				options={deliveryOptions}
// 				selectedValue={delivery}
// 				onSelect={setDelivery}
// 			/>

// 			<FilterBottomSheet<DateSort>
// 				ref={dateRef}
// 				title="Sort by Date"
// 				options={dateSortOptions}
// 				selectedValue={dateSort}
// 				onSelect={setDateSort}
// 			/>
// 		</>
// 	);
// };
